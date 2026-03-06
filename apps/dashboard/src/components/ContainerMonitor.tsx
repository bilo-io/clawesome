// apps/dashboard/src/components/ContainerMonitor.tsx
'use client';

import React from 'react';
import { Box, Lock, Activity, ShieldCheck } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const ContainerMonitor = () => {
  const { theme } = useUIStore();
  const containers = [
    { id: 'nc-sandbox-01', status: 'Isolated', cpu: '2%', mem: '128MB', uptime: '12h 4m', cpuFill: '12%', memFill: '45%' },
    { id: 'nc-sandbox-02', status: 'Isolated', cpu: '0.1%', mem: '64MB', uptime: '4h 12m', cpuFill: '2%', memFill: '15%' },
  ];

  return (
    <div className="space-y-6">
      {containers.map((c, i) => (
        <motion.div 
          key={c.id} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "p-6 rounded-[32px] border transition-all shadow-xl group",
            theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/40"
          )}
        >
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-2xl transition-all shadow-inner border border-emerald-500/20",
                  theme === 'dark' ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600 shadow-emerald-500/10"
                )}>
                   <Box size={22} className="group-hover:rotate-12 transition-transform" />
                </div>
                <div>
                   <h4 className={cn("text-lg font-black tracking-tighter uppercase", theme === 'dark' ? "text-white" : "text-black")}>{c.id}</h4>
                   <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">
                      <Lock size={12} /> {c.status}
                   </div>
                </div>
             </div>
             <div className="text-right">
                <span className={cn("block font-mono text-sm font-black", theme === 'dark' ? "text-slate-400" : "text-indigo-600")}>{c.uptime}</span>
                <span className={cn("text-[9px] font-black uppercase tracking-[0.25em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>UPTIME</span>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                   <span className={theme === 'dark' ? "text-slate-500" : "text-slate-400"}>CPU Usage</span>
                   <span className="text-emerald-500 font-mono italic">{c.cpu}</span>
                </div>
                <div className={cn("h-2 w-full rounded-full p-0.5", theme === 'dark' ? "bg-slate-950" : "bg-slate-100 shadow-inner")}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: c.cpuFill }}
                      className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all" 
                    />
                </div>
             </div>
             <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                   <span className={theme === 'dark' ? "text-slate-500" : "text-slate-400"}>Neural Memory</span>
                   <span className="text-indigo-500 font-mono italic">{c.mem}</span>
                </div>
                <div className={cn("h-2 w-full rounded-full p-0.5", theme === 'dark' ? "bg-slate-950" : "bg-slate-100 shadow-inner")}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: c.memFill }}
                      className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)] transition-all" 
                    />
                </div>
             </div>
          </div>
        </motion.div>
      ))}

      <div className={cn(
        "p-6 rounded-[24px] border border-dashed flex items-center justify-between transition-all",
        theme === 'dark' ? "bg-slate-950/50 border-slate-800" : "bg-slate-50/80 border-slate-200"
      )}>
         <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Policy: <span className="text-indigo-500 italic">ENFORCING</span></span>
         </div>
         <button className={cn(
           "text-[10px] font-black uppercase tracking-widest transition-all",
           theme === 'dark' ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-indigo-600"
         )}>UPDATE SECURITY PROTOCOLS</button>
      </div>
    </div>
  );
};
