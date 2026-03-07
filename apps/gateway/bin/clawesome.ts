#!/usr/bin/env bun
import inquirer from 'inquirer';
import pc from 'picocolors';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { spawn, type Subprocess } from 'bun';
import gradient from 'gradient-string';

import { CLAWESOME_ASCII, clawesomeGradient, clearConsole, displayBranding } from '../../cli/src/utils/branding';

// State management
let gatewayProcess: Subprocess | null = null;
const ROOT_DIR = join(import.meta.dir, '../../..');
const PORT = 18789;

function getVersion(): string {
  try {
    const pkgPath = join(import.meta.dir, '../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    return `v${pkg.version}`;
  } catch {
    return 'v0.0.0-unknown';
  }
}

// Branding helper
async function showBranding() {
  await displayBranding(getVersion());
}

async function startGateway() {
  if (gatewayProcess) {
    console.log(pc.yellow('\n⚠️  Gateway is already running!'));
    return;
  }

  console.log(pc.cyan('\n🚀 Launching Clawesome Gateway...'));

  gatewayProcess = spawn(['bun', 'run', 'src/index.ts', 'start'], {
    cwd: join(import.meta.dir, '..'),
    stdout: 'inherit',
    stderr: 'inherit',
  });

  console.log(pc.green('✅ Gateway process spawned.'));
}

async function stopGateway() {
  if (!gatewayProcess) {
    console.log(pc.yellow('\n🔍    No active gateway process found.'));
    return;
  }

  console.log(pc.red('\n🛑 Stopping Gateway...'));

  if (gatewayProcess) {
    gatewayProcess.kill();
    await gatewayProcess.exited;
    gatewayProcess = null;
  } else {
    // If we don't have a tracked process, use the kill script
    try {
      const result = spawn(['bun', 'run', 'kill:gateway'], { cwd: ROOT_DIR, stdout: 'pipe' });
      await result.exited;
    } catch { }
  }

  console.log(pc.green('✅ Gateway stopped.'));
}

async function runDoctor() {
  console.log(pc.cyan('\n🩺 Running Clawesome Doctor...\n'));

  // Check Bun
  const bunCheck = await spawn(['bun', '--version'], { stdout: 'pipe' }).exited;
  console.log(`${bunCheck === 0 ? pc.green('✓') : pc.red('✗')} Bun runtime detected`);

  // Check Moon
  const moonCheck = await spawn(['moon', '--version'], { stdout: 'pipe' }).exited;
  console.log(`${moonCheck === 0 ? pc.green('✓') : pc.yellow('!')} Moon task runner ${moonCheck === 0 ? 'found' : 'missing'}`);

  // Check Port
  let portFree = false;
  try {
    const server = Bun.listen({
      port: PORT,
      hostname: '0.0.0.0',
      socket: {
        data() { },
        open() { },
        close() { },
        drain() { },
        error() { },
      }
    });
    server.stop();
    portFree = true;
  } catch {
    portFree = false;
  }
  console.log(`${portFree ? pc.green('✓') : pc.red('✗')} Port ${PORT} is ${portFree ? 'available' : 'in use'}`);

  // Check /agents
  const agentsPath = join(ROOT_DIR, 'agents');
  const agentsExists = existsSync(agentsPath);
  console.log(`${agentsExists ? pc.green('✓') : pc.red('✗')} ${agentsExists ? '/agents folder found' : '/agents folder missing at ' + agentsPath}`);

  console.log('\n');
}

async function runSetup() {
  console.log(pc.cyan('\n⚙️    Entering Setup Wizard...'));
  const setup = spawn(['bun', 'run', 'src/index.ts', 'setup'], {
    cwd: join(import.meta.dir, '..'),
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await setup.exited;
  console.log(pc.green('\n✅ Setup completed. Returning to menu.'));
}

async function pressEnter() {
  await (inquirer.prompt as any)([{ type: 'input', name: 'key', message: pc.dim('Press Enter to return to menu...') }]);
}

import { MAIN_MENU_CHOICES } from '@clawesome/cli-config';

async function mainMenu() {
  while (true) {
    await showBranding();
    const { action } = await (inquirer.prompt as any)([
      {
        type: 'select',
        name: 'action',
        message: 'Select an action:',
        prefix: '',
        pageSize: 10,
        choices: MAIN_MENU_CHOICES,
      },
    ]);

    switch (action) {
      case 'start':
        await startGateway();
        break;
      case 'restart':
        await stopGateway();
        await startGateway();
        break;
      case 'setup':
        await runSetup();
        break;
      case 'doctor':
        await runDoctor();
        await pressEnter();
        break;
      case 'version':
        await showBranding();
        console.log(pc.cyan(`  Detailed Version Info:`));
        console.log(pc.white(`  Clawesome Hub:   ${pc.bold(getVersion())}`));
        console.log(pc.dim(`  Binary:         ${import.meta.filename}`));
        console.log(pc.dim(`  Runtime:        Bun ${process.versions.bun} (${process.platform})\n`));
        await pressEnter();
        break;
      case 'stop':
        await stopGateway();
        break;
      case 'update':
        await showBranding();
        console.log(pc.cyan(`  Update Check:`));
        console.log(pc.white(`  Current Version: ${pc.bold(getVersion())}`));
        console.log(pc.dim(`  Run \`bun update\` or \`git pull\` to get the latest changes.\n`));
        await pressEnter();
        break;
      case 'exit':
        await stopGateway();
        // Also kill dashboard if we can find it
        console.log(pc.dim('Ensuring all processes are terminated...'));
        try {
          const killer = spawn(['bun', 'run', 'kill:all'], { cwd: ROOT_DIR, stdout: 'pipe' });
          await killer.exited;
        } catch { }
        console.log(pc.cyan('👋 Goodbye!'));
        process.exit(0);
    }
  }
}

// Global process handling
process.on('SIGINT', async () => {
  await stopGateway();
  process.exit(0);
});

mainMenu().catch((err) => {
  console.error(pc.red('Fatal error:'), err);
  process.exit(1);
});
