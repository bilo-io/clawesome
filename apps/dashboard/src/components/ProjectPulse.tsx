// apps/dashboard/src/components/ProjectPulse.tsx
'use client';

import React from 'react';
import { GitBranch, FileCode, CheckCircle2, ChevronRight, AlertCircle, Users } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export const ProjectPulse = () => {
  const { theme } = useUIStore();

  return (
    <div className="space-y-6">
      <div className={cn(
        "flex items-center justify-between p-6 rounded-3xl border transition-all shadow-xl group",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-indigo-100"
      )}>
        <div className="flex items-center gap-5">
           <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600 border border-indigo-500/20 shadow-inner">
              <GitBranch size={22} className="group-hover:rotate-12 transition-transform" />
           </div>
           <div>
               <h4 className={cn("text-lg font-black tracking-tighter uppercase", theme === 'dark' ? "text-white" : "text-black")}>main</h4>
              <p className={cn("text-[10px] font-bold uppercase tracking-[0.25em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Active Branch // 12 unpushed</p>
           </div>
        </div>
        <div className="flex -space-x-4">
           {[1, 2, 3].map(i => (
             <div key={i} className={cn(
               "w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black shadow-lg transition-transform hover:scale-110 cursor-pointer relative z-10",
               theme === 'dark' ? "border-slate-900 bg-slate-800 text-slate-300" : "border-white bg-slate-50 text-slate-700 shadow-slate-200/50 border-slate-100"
             )}>
                {String.fromCharCode(64 + i)}
             </div>
           ))}
           <div className={cn(
             "w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-xl bg-indigo-600 text-white border-indigo-500 hover:scale-110 cursor-pointer transition-transform relative z-20",
             theme === 'light' && "border-white"
           )}>
              <Users size={16} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
         <div className={cn(
            "p-6 rounded-3xl border transition-all shadow-xl group",
            theme === 'dark' ? "bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-emerald-100"
         )}>
            <div className="flex items-center gap-3 mb-5">
               <FileCode size={18} className="text-emerald-500" />
               <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>CLAUDE.md</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-xs font-black text-emerald-500 tracking-widest px-3 py-1 bg-emerald-500/10 rounded-lg">IN SYNC</span>
               <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 size={14} className="text-emerald-500" />
               </div>
            </div>
         </div>

         <div className={cn(
            "p-6 rounded-3xl border transition-all shadow-xl group",
            theme === 'dark' ? "bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10" : "bg-white border-rose-100 shadow-slate-200/50 hover:border-rose-300"
         )}>
            <div className="flex items-center gap-3 mb-5">
               <AlertCircle size={18} className="text-rose-500" />
               <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Uncommitted</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-xs font-black text-rose-500 tracking-widest px-3 py-1 bg-rose-500/10 rounded-lg">8 FILES</span>
               <ChevronRight size={18} className="text-rose-500 transition-transform group-hover:translate-x-1" />
            </div>
         </div>
      </div>
    </div>
  );
};
