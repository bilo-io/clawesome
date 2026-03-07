import * as p from '@clack/prompts';
import pc from 'picocolors';
import { displayBranding, clawesomeGradient } from '../utils/branding.js';
import gradient from 'gradient-string';
import { writeFileSync } from 'fs';
import path from 'path';

import { PROVIDERS, bullet, SETUP_QUESTIONS } from '@clawesome/cli-config';

export async function setup(): Promise<void> {
  await displayBranding();

  p.intro(clawesomeGradient(' 🐾  Welcome to Clawesome Setup Wizard '));

  const project = await p.group(
    {
      agentName: () =>
        p.text({
          message: bullet(SETUP_QUESTIONS.agentName.message),
          placeholder: SETUP_QUESTIONS.agentName.placeholder,
          validate: (val) => {
            if (!val) return 'Agent name is required.';
          },
        }),

      projectName: () =>
        p.text({
          message: bullet(SETUP_QUESTIONS.projectName.message),
          placeholder: SETUP_QUESTIONS.projectName.placeholder,
          validate: (val) => {
            if (!val) return 'Project name is required.';
            if (val.length < 3) return 'Must be at least 3 characters.';
          },
        }),

      provider: () =>
        p.select({
          message: bullet(SETUP_QUESTIONS.provider.message),
          options: Object.entries(PROVIDERS).map(([value, info]: [string, any]) => ({
            value,
            label: info.label,
          })),
        }),

      model: ({ results }) =>
        p.select({
          message: bullet(
            `Select a model from ${PROVIDERS[results.provider as keyof typeof PROVIDERS].label}:`
          ),
          options: PROVIDERS[results.provider as keyof typeof PROVIDERS].models,
        }),

      enableRag: () =>
        p.confirm({
          message: bullet(SETUP_QUESTIONS.enableRag.message),
          initialValue: true,
        }),

      gatewayPort: () =>
        p.text({
          message: bullet(SETUP_QUESTIONS.gatewayPort.message),
          placeholder: SETUP_QUESTIONS.gatewayPort.placeholder,
          defaultValue: SETUP_QUESTIONS.gatewayPort.placeholder,
        }),

      apiKey: () =>
        p.password({
          message: bullet(SETUP_QUESTIONS.apiKey.message),
          validate: (val) => {
            if (!val) return 'An API key is required.';
            if (val.length < 8) return 'Key looks too short — double check it.';
          },
        }),
    },
    {
      onCancel: () => {
        p.cancel(pc.red('Setup cancelled. No changes were made.'));
        process.exit(0);
      },
    }
  );

  const s = p.spinner();
  s.start('Synchronizing neural configuration...');
  await new Promise((r) => setTimeout(r, 2000));

  // Write a local .clawesome.json config
  const config = {
    agentName: project.agentName,
    projectName: project.projectName,
    provider: project.provider,
    model: project.model,
    enableRag: project.enableRag,
    gatewayPort: parseInt(project.gatewayPort ?? '17654'),
    createdAt: new Date().toISOString(),
  };
  writeFileSync(
    path.join(process.cwd(), '.clawesome.json'),
    JSON.stringify(config, null, 2)
  );

  s.stop('Configuration written to ' + pc.cyan('.clawesome.json'));

  p.outro(
    gradient(['#06b6d4', '#10b981'])(
      `\n  ✅  All systems ready!\n\n  Agent:    ${pc.bold(project.agentName)}\n  Project:  ${pc.bold(project.projectName)}\n  Model:    ${pc.bold(project.model as string)}\n\n  Run ${pc.bold(pc.cyan('clawesome start'))} to launch the gateway.\n`
    )
  );
}
