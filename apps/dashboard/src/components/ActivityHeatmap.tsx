// apps/dashboard/src/components/ActivityHeatmap.tsx
'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export const ActivityHeatmap = () => {
  const { theme } = useUIStore();
  const columns = 24; // Increased for more density
  const cells = Array.from({ length: columns * 7 }, () => Math.floor(Math.random() * 5));

  const getColor = (level: number) => {
    if (theme === 'dark') {
      switch(level) {
        case 0: return 'bg-slate-950 border-slate-900';
        case 1: return 'bg-indigo-950 border-indigo-900/50';
        case 2: return 'bg-indigo-800 border-indigo-700/50';
        case 3: return 'bg-indigo-600 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.2)]';
        case 4: return 'bg-indigo-400 border-indigo-300 shadow-[0_0_15px_rgba(129,140,248,0.4)]';
        default: return 'bg-slate-950';
      }
    } else {
      switch(level) {
        case 0: return 'bg-slate-100 border-slate-200';
        case 1: return 'bg-indigo-100 border-indigo-200/50';
        case 2: return 'bg-indigo-200 border-indigo-300/50';
        case 3: return 'bg-indigo-400 border-indigo-500/30 shadow-sm';
        case 4: return 'bg-indigo-600 border-indigo-700/30 shadow-md';
        default: return 'bg-slate-100';
      }
    }
  };

  return (
    <div className={cn(
        "p-8 rounded-[40px] border transition-all h-full flex flex-col justify-between shadow-xl group",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/50 shadow-none hover:bg-slate-900/60" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-indigo-100"
    )}>
      <div className="flex items-center justify-between mb-8">
         <span className={cn("text-[10px] font-black uppercase tracking-[0.25em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Neural Connectivity Pulse</span>
         <span className={cn("text-[10px] font-mono font-black tracking-widest px-3 py-1 rounded-full border shadow-sm", theme === 'dark' ? "text-indigo-400 border-indigo-500/20 bg-indigo-500/5" : "text-indigo-600 border-indigo-100 bg-indigo-50")}>2,482 TOTAL OPS</span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-6 -mx-1 px-1">
         {Array.from({ length: columns }).map((_, colIdx) => (
            <div key={colIdx} className="grid grid-rows-7 gap-1.5 shrink-0">
               {Array.from({ length: 7 }).map((_, rowIdx) => (
                 <div 
                   key={rowIdx} 
                   className={cn(
                     "w-3.5 h-3.5 rounded-[4px] border transition-all hover:scale-150 hover:z-10 cursor-crosshair",
                     getColor(cells[colIdx * 7 + rowIdx])
                   )}
                   title={`Level ${cells[colIdx * 7 + rowIdx]}`}
                 />
               ))}
            </div>
         ))}
      </div>
      <div className={cn(
        "mt-6 flex items-center justify-end gap-3 text-[9px] font-black uppercase tracking-[0.2em] transition-colors",
        theme === 'dark' ? "text-slate-600" : "text-slate-500"
      )}>
         <span>Dormant</span>
         <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map(l => (
              <div key={l} className={cn("w-2.5 h-2.5 rounded-[2px]", getColor(l))} />
            ))}
         </div>
         <span className={theme === 'dark' ? "text-indigo-400" : "text-indigo-600"}>Active Pulse</span>
      </div>
    </div>
  );
};
