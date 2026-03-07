#!/usr/bin/env bun
// apps/cli/src/index.ts

import { Command } from 'commander';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import pc from 'picocolors';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { spawn, type Subprocess } from 'bun';
import { CLAWESOME_ASCII, clawesomeGradient, clearConsole, displayBranding, displayBrandingSync } from './utils/branding.js';

// Legacy commands (Subcommands)
import { setup } from './commands/setup.js';
import { start } from './commands/start.js';
import { stop } from './commands/stop.js';
import { doctor } from './commands/doctor.js';

const program = new Command();
const PKG_PATH = join(import.meta.dir, '../package.json');
const ROOT_DIR = join(import.meta.dir, '../../..');

function getVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8'));
    return `v${pkg.version}`;
  } catch {
    return 'v0.0.0';
  }
}

// Branding helper
import { MAIN_MENU_CHOICES } from '@clawesome/cli-config';

async function showBranding() {
  await displayBranding(getVersion());
}

async function pressEnter() {
  await (inquirer.prompt as any)([{ type: 'input', name: 'key', message: pc.dim('Press Enter to return to menu...') }]);
}

async function interactiveRoot() {
  while (true) {
    await showBranding();

    const { action } = await (inquirer.prompt as any)([
      {
        type: 'select',
        name: 'action',
        // message: `${chalk.cyan('Clawesome')} Interactive Hub`,
        prefix: '', // Removes the '?'
        message: `${gradient.pastel('Clawesome')} | Select an option:`,
        pageSize: 10,
        choices: MAIN_MENU_CHOICES,
      },
    ]);

    switch (action) {
      case 'start':
        console.log(pc.cyan('\nStarting Gateway...'));
        await start({ port: '17871', open: true });
        console.log('\n');
        break;
      case 'restart':
        console.log(pc.cyan('\nRestarting Gateway...'));
        await stop();
        await start({ port: '17871', open: false });
        console.log('\n');
        break;
      case 'setup':
        console.log(pc.cyan('\nLaunching Setup Wizard...'));
        await setup();
        console.log('\n');
        break;
      case 'doctor':
        console.log(pc.cyan('\nRunning Diagnostics...'));
        await doctor();
        await pressEnter();
        break;
      case 'version':
        console.log(pc.cyan(`\nClawesome OS — ${pc.bold(getVersion())}`));
        console.log(pc.dim(`Runtime: Bun ${process.versions.bun} (${process.platform})`));
        console.log(pc.dim(`Workdir: ${process.cwd()}\n`));
        await pressEnter();
        break;
      case 'stop':
        console.log(pc.red('\nStopping Gateway...'));
        await stop();
        console.log('\n');
        break;
      case 'update':
        console.log(pc.cyan(`\nChecking for updates (Current version: ${pc.bold(getVersion())})...`));
        console.log(pc.dim('Use your package manager (e.g. `bun install` or `git pull`) to update Clawesome.'));
        await pressEnter();
        break;
      case 'exit':
        console.log(pc.dim('\nEnsuring all processes are terminated...'));
        try {
          // Attempt to run the monorepo kill script
          spawn(['bun', 'run', 'kill:all'], { cwd: ROOT_DIR, stdout: 'pipe' });
        } catch {}
        console.log(pc.cyan('👋 Goodbye!\n'));
        process.exit(0);
    }
  }
}

// ─── Programme Meta ────────────────────────────────────────────────────────────
program
  .name('clawesome')
  .description(pc.cyan('Clawesome OS — Neural Agent Orchestration Platform'))
  .version(getVersion(), '-v, --version', 'Print the current version')
  .addHelpText('beforeAll', () => {
    displayBrandingSync(getVersion());
    return '';
  })
  .action(async () => {
    // Default action if no subcommand is provided
    if (process.argv.length <= 2) {
      await interactiveRoot();
    }
  });

// ─── clawesome setup ───────────────────────────────────────────────────────────
program
  .command('setup')
  .description('Run the interactive setup wizard')
  .action(setup);

// ─── clawesome start ───────────────────────────────────────────────────────────
program
  .command('start')
  .description('Start the Clawesome Gateway')
  .option('-p, --port <number>', 'Port to run the gateway on', '17871')
  .option('--no-open', 'Do not automatically open the Dashboard')
  .action(start);

// ─── clawesome stop ────────────────────────────────────────────────────────────
program
  .command('stop')
  .description('Stop the running Clawesome Gateway process')
  .action(stop);

// ─── clawesome doctor ──────────────────────────────────────────────────────────
program
  .command('doctor')
  .description('Diagnose your Clawesome environment')
  .action(doctor);

// ─── Parse ────────────────────────────────────────────────────────────────────
program.parse(process.argv);
