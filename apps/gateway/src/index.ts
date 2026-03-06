#!/usr/bin/env bun
// apps/gateway/src/index.ts
import { Command } from 'commander';
import figlet from 'figlet';
import gradient from 'gradient-string';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { startServer } from './server';
import { DEFAULT_PORT } from '@antigravity/core';
import { CLAWESOME_ASCII, clawesomeGradient, clearConsole } from '../../cli/src/utils/branding';

const program = new Command();

import { PROVIDERS, formatMessage, SETUP_QUESTIONS } from '@clawesome/cli-config';

const displayBranding = () => {
  clearConsole();
  console.log(clawesomeGradient.multiline(CLAWESOME_ASCII));
};

program
  .name('clawesome')
  .description('Clawesome Gateway CLI')
  .version('0.1.0');

program
  .command('setup')
  .description('Initialize gateway configuration')
  .action(async () => {
    displayBranding();

    p.intro(clawesomeGradient(' Welcome to Clawesome Gateway Setup '));

    const project = await p.group(
      {
        agentName: () =>
          p.text({
            message: formatMessage(SETUP_QUESTIONS.agentName.message),
            placeholder: SETUP_QUESTIONS.agentName.placeholder,
            validate: (value) => {
              if (!value) return 'Please enter a name for your agent';
            },
          }),
        projectName: () =>
          p.text({
            message: formatMessage(SETUP_QUESTIONS.projectName.message),
            placeholder: SETUP_QUESTIONS.projectName.placeholder,
            validate: (value) => {
              if (!value) return 'Please enter a name';
              if (value.length < 3) return 'Name must be at least 3 characters';
            },
          }),
        provider: () =>
          p.select({
            message: formatMessage(SETUP_QUESTIONS.provider.message),
            options: Object.entries(PROVIDERS).map(([value, info]: [string, any]) => ({
              value,
              label: info.label,
            })),
          }),
        model: ({ results }) =>
          p.select({
            message: formatMessage(`Which model from ${PROVIDERS[results.provider as keyof typeof PROVIDERS].label}?`),
            options: PROVIDERS[results.provider as keyof typeof PROVIDERS].models,
          }),
        rag: () =>
          p.confirm({
            message: formatMessage(SETUP_QUESTIONS.enableRag.message),
            initialValue: true,
          }),
        apiKey: () =>
          p.password({
            message: formatMessage(SETUP_QUESTIONS.apiKey.message),
            validate: (value) => {
              if (!value) return 'API Key is required';
            },
          }),
      },
      {
        onCancel: () => {
          p.cancel('Setup cancelled. See you later!');
          process.exit(0);
        },
      }
    );

    const s = p.spinner();
    s.start('Initializing gateway neural links...');
    
    // Simulate complex validation and setup delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    s.stop('Neural synchronization complete.');

    p.outro(
      gradient(['#06b6d4', '#10b981'])(
        `Setup complete! Your gateway for "${project.projectName}" is ready.\nDefault active agent: ${pc.bold(project.agentName)}`
      )
    );
  });

program
  .command('start')
  .description('Start the gateway server')
  .option('-p, --port <number>', 'port to listen on', DEFAULT_PORT.toString())
  .action((options) => {
    const port = parseInt(options.port);
    startServer(port);
  });

program
  .command('dev')
  .description('Start the gateway server in dev mode')
  .action(() => {
    console.log('Starting in dev mode...');
    startServer();
  });

program.parse();
