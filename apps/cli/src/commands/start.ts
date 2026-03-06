import * as p from '@clack/prompts';
import pc from 'picocolors';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { displayBranding, clawesomeGradient } from '../utils/branding.js';

const PID_FILE = path.join(process.cwd(), '.clawesome.pid');
const CONFIG_FILE = path.join(process.cwd(), '.clawesome.json');
const DASHBOARD_PORT = 3000;

interface StartOptions {
  port: string;
  open: boolean;
}

export async function start(options: StartOptions): Promise<void> {
  await displayBranding();

  // Load config if it exists
  let config: Record<string, unknown> = {};
  if (existsSync(CONFIG_FILE)) {
    config = JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'));
  }

  const gatewayPort = parseInt((config.gatewayPort as string | undefined) ?? options.port);
  const dashboardUrl = `http://localhost:${DASHBOARD_PORT}`;
  const gatewayUrl = `http://localhost:${gatewayPort}`;

  p.intro(clawesomeGradient(' 🚀  Clawesome — Starting Gateway '));

  // Check if already running
  if (existsSync(PID_FILE)) {
    const existingPid = readFileSync(PID_FILE, 'utf-8').trim();
    try {
      process.kill(parseInt(existingPid), 0); // Test if process exists
      p.log.warn(pc.yellow(`Gateway is already running (PID ${existingPid}). Run ${pc.bold('clawesome stop')} first.`));
      return;
    } catch {
      // PID file stale — clean it up
    }
  }

  const s = p.spinner();
  s.start('Spawning gateway process...');

  // Spawn the gateway as a detached background process
  const child = Bun.spawn(['bun', 'run', 'src/index.ts', 'start', '--port', gatewayPort.toString()], {
    cwd: path.join(process.cwd(), 'apps/gateway'),
    stdout: 'inherit',
    stderr: 'inherit',
  });

  // Write PID file
  writeFileSync(PID_FILE, child.pid!.toString());

  await new Promise((r) => setTimeout(r, 1500));
  s.stop('Gateway process started.');

  p.log.success(
    [
      '',
      pc.bold('  Clawesome is running!'),
      '',
      `  ${pc.dim('Gateway')}    ${pc.cyan(pc.bold(gatewayUrl))}`,
      `  ${pc.dim('Dashboard')}  ${pc.cyan(pc.bold(dashboardUrl))}`,
      `  ${pc.dim('PID')}        ${pc.yellow(child.pid!.toString())}`,
      '',
    ].join('\n')
  );

  if (options.open) {
    s.start('Opening dashboard in your browser...');
    try {
      const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
      execSync(`${openCmd} ${dashboardUrl}`);
      s.stop('Dashboard opened.');
    } catch {
      s.stop(pc.yellow('Could not open browser automatically. Visit the URL above.'));
    }
  }

  p.outro(clawesomeGradient(`  Run ${pc.bold('clawesome stop')} to shut down the gateway.`));
}
