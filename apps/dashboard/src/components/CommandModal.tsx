// apps/dashboard/src/components/CommandModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Search, Command as CommandIcon, FileText, Terminal, HelpCircle, X } from 'lucide-react';

export const CommandModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { isFocusMode } = useUIStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (isFocusMode || !isOpen) return null;

  const results = [
    { icon: Terminal, label: 'Run: bun run server.ts', category: 'Commands' },
    { icon: FileText, label: '001_clawesome_project_bootstrap.md', category: 'Files' },
    { icon: HelpCircle, label: 'How to configure Moon v2?', category: 'AI Help' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center px-4 py-3 border-b border-slate-800">
          <Search className="text-slate-500 mr-3" size={20} />
          <input
            autoFocus
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded border border-slate-700 text-[10px] text-slate-400 font-mono">
             <CommandIcon size={10} />
             <span>K</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="ml-4 p-1 hover:bg-slate-800 rounded transition-colors text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto no-scrollbar">
          {results.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-600/20 hover:text-indigo-300 group cursor-pointer transition-all border border-transparent hover:border-indigo-500/30"
            >
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-indigo-400 transition-colors">
                <item.icon size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-2 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between">
           <span className="text-[10px] text-slate-600 font-mono">3 results found</span>
           <div className="flex gap-4">
              <span className="text-[10px] text-slate-600 flex items-center gap-1">
                 <span className="px-1 bg-slate-800 rounded border border-slate-700 font-mono">ENTER</span> to select
              </span>
           </div>
        </div>
      </div>
    </div>
  );
};
