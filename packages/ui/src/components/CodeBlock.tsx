'use client';

import React from 'react';
import { Clipboard } from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const { theme } = useUI();
  
  // Invert theme for terminal feel: 
  // - Dark theme -> Light Terminal
  // - Light theme -> Dark Terminal

  return (
    <div className={cn(
      "group relative rounded-2xl border overflow-hidden font-mono text-xs my-6 transition-all",
      theme === 'dark' 
        ? "bg-slate-950 border-slate-800 shadow-2xl"
        : "bg-slate-50 border-slate-200 shadow-xl shadow-black/5" 
    )}>
      <div className={cn(
        "flex items-center justify-between px-5 py-3 border-b",
        theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-slate-100/80 border-slate-200"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          </div>
          <span className={cn(
            "uppercase tracking-widest text-[10px] font-black ml-2",
            theme === 'dark' ? "text-slate-500" : "text-slate-400"
          )}>{language}</span>
        </div>
        <button className={cn(
          "transition-colors p-1.5 rounded-lg",
          theme === 'dark' ? "text-slate-500 hover:text-indigo-400 hover:bg-white/5" : "text-slate-400 hover:text-indigo-600 hover:bg-slate-200"
        )}>
          <Clipboard size={14} />
        </button>
      </div>
      
      <pre className={cn(
        "p-6 overflow-x-auto leading-relaxed",
        theme === 'dark' ? "text-emerald-400" : "text-slate-800"
      )}>
        <code className="block">{code}</code>
      </pre>

      {/* Action Overlay removed per user request */}
    </div>
  );
};
