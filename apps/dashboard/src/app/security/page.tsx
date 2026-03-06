'use client';

import React from 'react';
import { ContainerMonitor } from '@/components/ContainerMonitor';
import { FilesystemSandbox } from '@/components/FilesystemSandbox';
import { PermissionToggle } from '@/components/PermissionToggle';
import { ShieldCheck, Lock, Activity, EyeIcon, ShieldAlert } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

export default function SecurityHUD() {
  const { theme } = useUIStore();

  return (
    <main className="space-y-10 pb-20 max-w-[1600px] mx-auto">
      <DashboardResourceHeader
        title="Security"
        description="Global runtime integrity and isolation monitoring. Manage filesystem sandboxing, containerized agent environments, and cryptographically verified operational traces."
        badge="NC-SHIELD"
        statusLabel="Runtime Integrity:"
        statusValue="Verified"
        statusColor="emerald"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-4">
            <div className={cn(
              "px-6 py-3 rounded-2xl border flex flex-col items-end shadow-xl",
              theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
            )}>
                <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Active Sandboxes</span>
                <span className="text-2xl font-black text-emerald-500 tracking-tighter">02</span>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
         <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                   <Activity size={18} />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Runtime Monitoring</h2>
              </div>
              <ContainerMonitor />
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                   <EyeIcon size={18} />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Entropy & Trace</h2>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "p-12 rounded-[40px] border border-dashed flex flex-col items-center justify-center text-center space-y-6 transition-all",
                  theme === 'dark' ? "bg-slate-900/10 border-slate-800" : "bg-slate-50/50 border-slate-200"
                )}
              >
                 <div className={cn(
                   "p-6 rounded-full shadow-2xl transition-all group-hover:rotate-12",
                   theme === 'dark' ? "bg-slate-900 text-slate-700 border border-slate-800" : "bg-white text-slate-300 border border-slate-100 shadow-slate-200/50"
                 )}>
                    <Lock size={48} className={theme === 'dark' ? "text-indigo-500/30" : "text-slate-300"} />
                 </div>
                 <div className="space-y-2">
                    <p className={cn("text-lg font-black tracking-tight", theme === 'dark' ? "text-slate-400" : "text-slate-950")}>Deep Trace Log Locked</p>
                    <p className={cn("text-xs font-bold leading-relaxed max-w-sm mx-auto", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>Elevated security clearance required to view raw agent socket buffers. Access is restricted to NC-GUARD authorized nodes.</p>
                 </div>
                 <button className={cn(
                   "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95",
                   theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 shadow-sm"
                 )}>
                   Request Clearance
                 </button>
              </motion.div>
            </section>
         </div>

         <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                   <ShieldCheck size={18} />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Access Control</h2>
              </div>
              <PermissionToggle />
            </section>

            <section className="space-y-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                   <Lock size={18} />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Filesystem Sandbox</h2>
              </div>
              <FilesystemSandbox />
            </section>
         </div>
      </div>
    </main>
  );
}
