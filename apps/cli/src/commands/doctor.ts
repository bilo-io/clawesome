import * as p from '@clack/prompts';
import pc from 'picocolors';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { displayBranding, clawesomeGradient } from '../utils/branding.js';

interface CheckResult {
  label: string;
  ok: boolean;
  detail: string;
}

function check(label: string, fn: () => string): CheckResult {
  try {
    const detail = fn();
    return { label, ok: true, detail };
  } catch {
    return { label, ok: false, detail: 'Not found or error' };
  }
}

function getVersion(cmd: string): string {
  return execSync(cmd, { stdio: 'pipe' }).toString().trim();
}

function checkMinVersion(version: string, min: number[]): boolean {
  const parts = version.replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < min.length; i++) {
    if ((parts[i] ?? 0) > min[i]) return true;
    if ((parts[i] ?? 0) < min[i]) return false;
  }
  return true;
}

export async function doctor(): Promise<void> {
  await displayBranding();

  p.intro(clawesomeGradient(' 🩺  Clawesome Doctor — Environment Diagnostics '));

  const s = p.spinner();
  s.start('Running diagnostics...');
  await new Promise((r) => setTimeout(r, 800));
  s.stop('Diagnostics complete.\n');

  // ─── Checks ──────────────────────────────────────────────────────────────
  const results: CheckResult[] = [
    // Runtime
    check('Node.js (≥ 20.x)', () => {
      const v = getVersion('node --version');
      if (!checkMinVersion(v, [20])) throw new Error(`Found ${v}, need ≥ v20`);
      return v;
    }),
    check('pnpm (≥ 8.x)', () => {
      const v = getVersion('pnpm --version');
      if (!checkMinVersion(v, [8])) throw new Error(`Found ${v}, need ≥ v8`);
      return `v${v}`;
    }),
    check('Bun (optional)', () => getVersion('bun --version')),

    // Workspace files
    check('pnpm-workspace.yaml', () => {
      const f = path.join(process.cwd(), 'pnpm-workspace.yaml');
      if (!existsSync(f)) throw new Error('Missing');
      return 'Found';
    }),
    check('.clawesome.json config', () => {
      const f = path.join(process.cwd(), '.clawesome.json');
      if (!existsSync(f)) throw new Error('Not found — run clawesome setup');
      return 'Found';
    }),
    check('apps/gateway present', () => {
      if (!existsSync(path.join(process.cwd(), 'apps/gateway'))) throw new Error('Missing');
      return 'Found';
    }),
    check('apps/dashboard present', () => {
      if (!existsSync(path.join(process.cwd(), 'apps/dashboard'))) throw new Error('Missing');
      return 'Found';
    }),
    check('packages/ui present', () => {
      if (!existsSync(path.join(process.cwd(), 'packages/ui'))) throw new Error('Missing');
      return 'Found';
    }),

    // Env
    check('Git', () => getVersion('git --version')),
    check('Homebrew (optional)', () => getVersion('brew --version')),
    check('Proto (optional)', () => getVersion('proto --version')),
    check('Ollama (optional)', () => getVersion('ollama --version')),
    check('TypeScript (tsc)', () => getVersion('tsc --version')),
  ];

  // ─── Print results ────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  const maxLabel = Math.max(...results.map((r) => r.label.length));

  console.log('');
  for (const r of results) {
    const icon = r.ok ? pc.green('✔') : pc.red('✖');
    const label = r.label.padEnd(maxLabel + 2);
    const detail = r.ok ? pc.dim(r.detail) : pc.red(r.detail);
    console.log(`  ${icon}  ${pc.bold(label)} ${detail}`);
  }
  console.log('');

  // ─── Summary ──────────────────────────────────────────────────────────────
  const summary = failed === 0
    ? pc.green(`  ✅  All ${passed} checks passed — your Clawesome environment looks healthy!`)
    : pc.yellow(`  ⚠️   ${passed} passed, ${pc.red(failed.toString())} failed — see issues above.`);

  console.log(summary + '\n');

  if (failed > 0) {
    p.log.info(`Run ${pc.cyan(pc.bold('clawesome setup'))} to initialise missing configuration.`);
  }

  p.outro(clawesomeGradient('  Doctor out. 🩺'));
}
