// apps/dashboard/src/components/SmartHistorySearch.tsx
'use client';

import React from 'react';
import { Search, Filter, Calendar, Terminal, Command } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const historyItems = [
  { command: 'bun run dev --filter dashboard', date: 'Dec 14, 01:23', type: 'manual' },
  { command: 'grep -r "useSocket" ./src', date: 'Dec 14, 01:10', type: 'agent' },
  { command: 'git commit -m "feat: sidebar nav"', date: 'Dec 13, 23:45', type: 'manual' },
  { command: 'cat docs/tasks/003_app_flesh_out.md', date: 'Dec 13, 23:02', type: 'agent' },
];

export const SmartHistorySearch = () => {
  const { theme } = useUIStore();

  return (
    <div className="space-y-6">
      <div className="relative group">
         <Search className={cn(
           "absolute left-5 top-1/2 -translate-y-1/2 transition-colors",
           theme === 'dark' ? "text-slate-500 group-focus-within:text-indigo-400" : "text-slate-400 group-focus-within:text-indigo-600"
         )} size={20} />
         <input 
           type="text" 
           placeholder="Search history with natural language... (e.g. 'find my last git commit')"
           className={cn(
             "w-full rounded-[24px] py-6 pl-14 pr-24 text-sm font-medium focus:outline-none focus:ring-4 transition-all shadow-xl",
             theme === 'dark' 
               ? "bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:ring-indigo-500/10 focus:border-indigo-500/40 shadow-none" 
               : "bg-white border border-slate-100 text-slate-950 placeholder:text-slate-400 focus:ring-indigo-500/5 focus:border-indigo-200 shadow-slate-200/40"
           )}
         />
         <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <kbd className={cn(
              "px-3 py-1.5 rounded-lg text-[10px] font-black border shadow-sm flex items-center gap-1",
              theme === 'dark' ? "bg-slate-900 border-slate-700 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"
            )}>
              <Command size={10} /> S
            </kbd>
         </div>
      </div>

      <div className={cn(
        "rounded-[32px] border overflow-hidden shadow-2xl transition-all",
        theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100 shadow-slate-200/40"
      )}>
         <div className={cn(
           "p-4 border-b flex items-center justify-between transition-colors",
           theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-slate-50/50 border-slate-50"
         )}>
            <div className={cn(
              "flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]",
              theme === 'dark' ? "text-slate-500" : "text-slate-400"
            )}>
               <span className="flex items-center gap-2 hover:text-indigo-500 cursor-pointer transition-colors"><Filter size={14} /> Filter: All</span>
               <span className="flex items-center gap-2 hover:text-indigo-500 cursor-pointer transition-colors"><Calendar size={14} /> Range: Last 24h</span>
            </div>
         </div>
         
         <div className={cn("divide-y", theme === 'dark' ? "divide-slate-900" : "divide-slate-50")}>
            {historyItems.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "p-5 transition-all flex items-center justify-between group",
                  theme === 'dark' ? "hover:bg-slate-900/40" : "hover:bg-slate-50/80"
                )}
              >
                 <div className="flex items-center gap-6 min-w-0">
                    <div className={cn(
                      "p-3 rounded-2xl transition-all shadow-inner border",
                      item.type === 'agent' 
                        ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100') 
                        : (theme === 'dark' ? 'bg-slate-900 text-slate-600 border-slate-800' : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60')
                    )}>
                       <Terminal size={18} />
                    </div>
                    <div className="min-w-0 flex flex-col gap-1">
                       <code className={cn(
                         "text-sm font-mono transition-colors truncate block selection:bg-indigo-500/30",
                         theme === 'dark' ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950 font-bold"
                       )}>
                          {item.command}
                       </code>
                       <div className="flex items-center gap-3">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                            item.type === 'agent' 
                              ? (theme === 'dark' ? "text-indigo-400/60 border-indigo-500/20" : "text-indigo-600/60 border-indigo-200 bg-indigo-50/30") 
                              : (theme === 'dark' ? "text-slate-600 border-slate-800" : "text-slate-400 border-slate-200")
                          )}>
                             {item.type} origin
                          </span>
                          <span className={cn("text-[9px] uppercase font-bold tracking-widest opacity-40 tabular-nums", theme === 'light' && "text-slate-500")}>
                             {item.date}
                          </span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <button className={cn(
                      "opacity-0 group-hover:opacity-100 p-3 rounded-xl transition-all active:scale-95 shadow-sm",
                      theme === 'dark' ? "bg-slate-900 hover:bg-slate-800 text-slate-400" : "bg-white border border-slate-100 hover:border-indigo-200 text-slate-400 hover:text-indigo-600"
                    )}>
                       <Search size={16} />
                    </button>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};
