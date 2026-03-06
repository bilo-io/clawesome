import * as p from '@clack/prompts';
import pc from 'picocolors';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { displayBranding, clawesomeGradient } from '../utils/branding.js';

const PID_FILE = path.join(process.cwd(), '.clawesome.pid');

export async function stop(): Promise<void> {
  await displayBranding();

  p.intro(clawesomeGradient(' 🛑  Clawesome — Stopping Gateway '));

  if (!existsSync(PID_FILE)) {
    p.log.warn(pc.yellow('No running gateway detected. Nothing to stop.'));
    p.log.info(`If the gateway is running, find the PID manually with ${pc.bold('lsof -i :<port>')} and kill it.`);
    p.outro(pc.dim('Exited.'));
    return;
  }

  const pid = parseInt(readFileSync(PID_FILE, 'utf-8').trim());

  const s = p.spinner();
  s.start(`Stopping gateway process (PID ${pc.yellow(pid.toString())})...`);

  try {
    process.kill(pid, 'SIGTERM');
    await new Promise((r) => setTimeout(r, 800));

    // Verify it actually stopped; escalate to SIGKILL if needed
    try {
      process.kill(pid, 0);
      process.kill(pid, 'SIGKILL');
      await new Promise((r) => setTimeout(r, 500));
    } catch {
      // Already gone — that's fine
    }

    unlinkSync(PID_FILE);
    s.stop(pc.green('Gateway stopped successfully.'));
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === 'ESRCH') {
      // Process was already dead — clean up stale PID file
      unlinkSync(PID_FILE);
      s.stop(pc.yellow('Process was no longer running. Cleaned up stale PID file.'));
    } else {
      s.stop(pc.red(`Failed to stop process: ${error.message}`));
      process.exit(1);
    }
  }

  p.outro(clawesomeGradient(`  All clear. Run ${pc.bold('clawesome start')} to restart.`));
}
