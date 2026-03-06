'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Power, Terminal, FileCode } from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';
import { motion } from 'framer-motion';

export const PermissionToggle = () => {
  const { theme } = useUI();
  const [isBashEnabled, setIsBashEnabled] = useState(true);
  const [isFileEnabled, setIsFileEnabled] = useState(true);

  const permissions = [
    { id: 'bash', label: 'Bash Execution', state: isBashEnabled, setter: setIsBashEnabled, desc: 'Allow agents to run system commands', icon: Terminal, color: 'indigo' },
    { id: 'file', label: 'Filesystem Write', state: isFileEnabled, setter: setIsFileEnabled, desc: 'Allow agents to modify project files', icon: FileCode, color: 'emerald' },
  ];

  return (
    <div className={cn(
      "p-8 rounded-2xl border transition-all shadow-xl space-y-8",
      theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
    )}>
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
               <ShieldCheck size={20} />
            </div>
            <h3 className={cn("text-lg font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Agent Permissions</h3>
         </div>
      </div>

      <div className="space-y-4">
        {permissions.map((p) => (
          <div key={p.id} className={cn(
            "p-5 rounded-3xl border transition-all flex items-center justify-between group",
            theme === 'dark' ? "bg-slate-950/50 border-slate-800/50 hover:bg-slate-950" : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-indigo-100 shadow-inner hover:shadow-xl"
          )}>
             <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl shadow-inner",
                  p.state 
                    ? (p.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-emerald-500/10 text-emerald-500')
                    : (theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400')
                )}>
                   <p.icon size={18} />
                </div>
                <div>
                   <span className={cn("block text-sm font-black tracking-tight", theme === 'dark' ? "text-slate-200" : "text-slate-950")}>{p.label}</span>
                   <span className={cn("text-[10px] uppercase font-bold tracking-widest opacity-60", theme === 'light' && "text-slate-500")}>{p.desc}</span>
                </div>
             </div>
             <button 
               onClick={() => p.setter(!p.state)}
               className={cn(
                 "w-12 h-6 rounded-full relative transition-all shadow-inner border border-transparent flex items-center px-1",
                 p.state 
                  ? (p.color === 'indigo' ? 'bg-indigo-600 shadow-indigo-500/20 justify-end' : 'bg-emerald-600 shadow-emerald-500/20 justify-end') 
                  : (theme === 'dark' ? 'bg-slate-800 border-slate-700 justify-start' : 'bg-slate-200 border-slate-300 justify-start')
               )}
             >
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-white shadow-md" 
                />
             </button>
          </div>
        ))}
      </div>

      <div className={cn(
        "p-5 border border-dashed rounded-xl flex items-start gap-4 transition-all overflow-hidden relative",
        theme === 'dark' ? "bg-amber-500/5 border-amber-500/20 text-amber-500/80" : "bg-amber-50 border-amber-200 text-amber-700 shadow-inner"
      )}>
         <ShieldAlert size={18} className="shrink-0 mt-0.5" />
         <p className="text-[10px] leading-relaxed font-bold uppercase tracking-widest italic">
            Override persistence detected. NC-OS will force-revert system-wide modifications every 24h.
         </p>
         
         <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      <button className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-rose-600/20 active:scale-95 flex items-center justify-center gap-3">
         <Power size={18} /> Master Kill Switch
      </button>
    </div>
  );
};
