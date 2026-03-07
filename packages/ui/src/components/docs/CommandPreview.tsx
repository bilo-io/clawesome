// @ts-nocheck
'use client';
/* SHOWCASE_MOCKS_START */
// @ts-ignore
const Link = (props: any) => <a href={props.href} {...props}>{props.children}</a>;
// @ts-ignore
const Image = (props: any) => <img src={props.src} alt={props.alt} {...props} />;
// @ts-ignore
const usePathname = () => "";
// @ts-ignore
const useSearchParams = () => new URLSearchParams();
// @ts-ignore
const useTheme = () => ({ theme: 'dark', setTheme: () => {} });
/* SHOWCASE_MOCKS_END */






import React, { useState } from 'react';
import { CodePreview } from './CodePreview';
import { useUI, cn } from '@clawesome/ui';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

interface CommandPreviewProps {
  commands: Record<PackageManager, string>;
}

export function CommandPreview({ commands }: CommandPreviewProps) {
  const [pm, setPm] = useState<PackageManager>('pnpm');
  const { theme } = useUI();

  const managers: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

  return (
    <div className="my-10 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mr-4">Package Manager</span>
        {managers.map(m => (
          <button
            key={m}
            onClick={() => setPm(m)}
            className={cn(
              "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              pm === m 
                ? (theme === 'dark' ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "bg-indigo-50 text-indigo-600 border border-indigo-200")
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700")
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <CodePreview code={commands[pm]} language="bash" />
    </div>
  );
}
