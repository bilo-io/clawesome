'use client';






import React, { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { Copy, Check } from 'lucide-react';
import { useUI } from '../../ThemeContext';
import { cn } from '../../utils';

interface CodePreviewProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodePreview({ code, language = 'bash', showLineNumbers = false }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useUI();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = hljs.highlightAuto(code, language ? [language] : undefined).value;

  // Non-inverted: Dark mode -> Dark, Light mode -> Light
  const isDarkBase = theme === 'dark';

  return (
    <div className={cn(
      "relative group rounded-2xl overflow-hidden border transition-all my-8 shadow-2xl",
      isDarkBase ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
    )}>
      <div className={cn(
        "flex items-center justify-between px-6 py-4 border-b text-xs font-mono font-black tracking-[0.2em] uppercase transition-colors",
        isDarkBase ? "bg-slate-900/50 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30 border border-rose-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30 border border-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/40" />
          </div>
          <span className="ml-4 opacity-70">{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-2 transition-all active:scale-95 px-3 py-1.5 rounded-lg border",
            isDarkBase 
              ? "hover:text-white border-slate-700 hover:bg-white/5" 
              : "hover:text-indigo-600 border-slate-200 hover:bg-slate-50"
          )}
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? <span className="text-emerald-400">Copied</span> : 'Copy'}
        </button>
      </div>
      <div className={cn(
        "p-8 overflow-x-auto text-[13px] font-mono leading-relaxed transition-colors",
        isDarkBase ? "text-slate-300 hljs-dark" : "text-slate-800 hljs-light"
      )}>
        <pre><code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} /></pre>
      </div>
    </div>
  );
}
