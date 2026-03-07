'use client';






import React, { useState } from 'react';
import { CodePreview } from './CodePreview';
import { useUI } from '../../ThemeContext';
import { cn } from '../../utils';

interface LanguageBlock {
  language: string;
  label: string;
  code: string;
}

interface LanguagePreviewProps {
  blocks: LanguageBlock[];
}

export function LanguagePreview({ blocks }: LanguagePreviewProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const { theme } = useUI();

  if (!blocks || blocks.length === 0) return null;

  const activeBlock = blocks[activeIdx];

  return (
    <div className="my-10 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {blocks.map((b, idx) => (
          <button
            key={b.label}
            onClick={() => setActiveIdx(idx)}
            className={cn(
              "px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all",
              activeIdx === idx 
                ? (theme === 'dark' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10" : "bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm")
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100")
            )}
          >
            {b.label}
          </button>
        ))}
      </div>
      <CodePreview code={activeBlock.code} language={activeBlock.language} />
    </div>
  );
}
