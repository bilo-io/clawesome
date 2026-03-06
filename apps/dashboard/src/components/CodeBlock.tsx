// apps/dashboard/src/components/CodeBlock.tsx
'use client';

import React from 'react';
import { Play, Clipboard, HelpCircle, Terminal as TerminalIcon } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  return (
    <div className="group relative rounded-xl bg-black/40 border border-slate-800 overflow-hidden font-mono text-xs my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
        <span className="text-slate-500 uppercase tracking-tighter">{language}</span>
        <button className="text-slate-500 hover:text-indigo-400 transition-colors">
          <Clipboard size={14} />
        </button>
      </div>
      
      <pre className="p-4 overflow-x-auto text-indigo-100">
        <code>{code}</code>
      </pre>

      {/* Action Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 border border-indigo-400/50">
          <Play size={12} className="fill-current" />
          <span className="font-semibold">Run</span>
        </button>
        
        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg shadow-xl shadow-black/50 transition-all hover:scale-105 active:scale-95 border border-slate-700">
          <TerminalIcon size={12} />
          <span className="font-semibold">Insert</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg shadow-xl shadow-black/50 transition-all hover:scale-105 active:scale-95 border border-slate-700">
          <HelpCircle size={12} />
          <span className="font-semibold text-[10px]">Explain</span>
        </button>
      </div>
    </div>
  );
};
