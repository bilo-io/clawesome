'use client';

import React from 'react';
import { SmartHistorySearch } from '@/components/SmartHistorySearch';
import { History, ListTodo, Download, Share2, Target } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

export default function HistoryPage() {
  const { theme } = useUIStore();

  return (
    <main className="space-y-6 pb-20 max-w-[1400px] mx-auto">
      <DashboardResourceHeader
        title="History"
        description="Comprehensive audit trail and semantic search for historical operations. Trace the lifecycle of agent decisions, tool executions, and system-wide state transitions over time."
        badge="NC-AUDIT"
        statusLabel="Archival Status:"
        statusValue="Indexed"
        statusColor="emerald"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-4">
            <button className={cn(
              "px-6 py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm active:scale-95",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300"
            )}>
                <Download size={16} /> EXPORT LOGS
            </button>
            <button className="px-6 py-3 bg-indigo-600 rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
                <Share2 size={16} /> SHARE TRACE
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         <div className="lg:col-span-3 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <History size={18} className="text-indigo-500" />
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Advanced Neural Search</h2>
              </div>
              <SmartHistorySearch />
            </section>
         </div>

         <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <Target size={18} className="text-emerald-500" />
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Session Summary</h2>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "p-8 rounded-[32px] border transition-all shadow-xl space-y-6",
                  theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/40"
                )}
              >
                 <div className="flex items-center justify-between">
                    <span className={cn("text-[11px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Total Commands</span>
                    <span className={cn("font-mono text-lg font-black tracking-tighter", theme === 'dark' ? "text-slate-200" : "text-slate-900")}>1,248</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className={cn("text-[11px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Agent Operations</span>
                    <span className="font-mono text-lg font-black text-indigo-500 tracking-tighter">842</span>
                 </div>
                 <div className={cn("pt-6 border-t flex flex-col gap-2", theme === 'dark' ? "border-slate-800" : "border-slate-50")}>
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>Execution Time</span>
                    <span className="text-3xl font-black text-emerald-500 tracking-tighter">12h 42m</span>
                 </div>
                 
                 <div className={cn(
                   "p-4 rounded-2xl text-[10px] font-bold italic leading-relaxed",
                   theme === 'dark' ? "bg-indigo-500/5 text-indigo-400/60" : "bg-indigo-50/50 text-indigo-600/60"
                 )}>
                   System integrity verified across all historical neural fragments for this session.
                 </div>
              </motion.div>
            </section>
         </div>
      </div>
    </main>
  );
}
