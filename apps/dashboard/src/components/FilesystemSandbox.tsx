// apps/dashboard/src/components/FilesystemSandbox.tsx
'use client';

import React from 'react';
import { Folder, File, ChevronRight, Eye, EyeOff, ShieldAlert, Lock, Unlock } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const FilesystemSandbox = () => {
  const { theme } = useUIStore();
  const tree = [
    { name: 'src', type: 'folder', children: 12, mounted: true },
    { name: 'package.json', type: 'file', mounted: true },
    { name: 'moon.yml', type: 'file', mounted: true },
    { name: '.env', type: 'file', mounted: false },
    { name: 'node_modules', type: 'folder', children: 832, mounted: false },
  ];

  return (
    <div className={cn(
      "p-8 rounded-[40px] border transition-all shadow-xl h-full flex flex-col",
      theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
    )}>
      <div className={cn(
        "flex items-center justify-between mb-8 pb-4 border-b",
        theme === 'dark' ? "border-slate-800/50" : "border-slate-50"
      )}>
         <span className={cn("text-[10px] font-black uppercase tracking-[0.25em]", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Workspace Isolation Zone</span>
         <span className="text-[10px] font-mono text-emerald-500 font-bold px-3 py-1 bg-emerald-500/10 rounded-lg">3/5 MOUNTED</span>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
        {tree.map((item, i) => (
          <motion.div 
            key={item.name} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex items-center justify-between p-3 rounded-2xl transition-all group",
              item.mounted 
                ? (theme === 'dark' ? 'hover:bg-slate-800/50 border border-transparent hover:border-indigo-500/20' : 'hover:bg-slate-50 border border-transparent hover:border-indigo-100')
                : 'opacity-30 grayscale pointer-events-none'
            )}
          >
            <div className="flex items-center gap-4">
               <div className={cn(
                 "p-2.5 rounded-xl shadow-inner",
                 item.type === 'folder' 
                   ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600')
                   : (theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400')
               )}>
                  {item.type === 'folder' ? (
                    <Folder size={18} />
                  ) : (
                    <File size={18} />
                  )}
               </div>
               <div className="flex flex-col">
                  <span className={cn("text-sm font-black tracking-tight", theme === 'dark' ? "text-slate-200" : "text-slate-900")}>{item.name}</span>
                  {item.type === 'folder' && (
                    <span className={cn("text-[9px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>{item.children} assets</span>
                  )}
               </div>
            </div>
            <div className="flex items-center gap-4">
               {item.mounted ? (
                 <>
                   <button className={cn(
                     "p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100",
                     theme === 'dark' ? "hover:bg-slate-700 text-slate-500 hover:text-indigo-400" : "hover:bg-white text-slate-300 hover:text-indigo-600 shadow-sm"
                   )}>
                      <Eye size={14} />
                   </button>
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 </>
               ) : (
                 <ShieldAlert size={14} className="text-rose-500" />
               )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className={cn(
        "mt-8 p-4 rounded-[24px] flex items-center gap-4 transition-all border shadow-inner",
        theme === 'dark' ? "bg-indigo-500/5 border-indigo-500/10 text-indigo-400" : "bg-indigo-50/50 border-indigo-100 text-indigo-600"
      )}>
         <Lock size={16} className="shrink-0" />
         <span className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
           Neural isolation enforcing write-protect on system sensitive nodes.
         </span>
         <ChevronRight size={16} className="ml-auto opacity-40 shrink-0" />
      </div>
    </div>
  );
};
