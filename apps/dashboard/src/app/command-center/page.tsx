// apps/dashboard/src/app/command-center/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useInstanceStore } from '@/store/useInstanceStore';
import { 
  Play, 
  Square, 
  Activity, 
  Power, 
  Monitor, 
  Database, 
  Cloud, 
  Zap, 
  Terminal as TerminalIcon, 
  Info,
  CheckCircle2,
  AlertCircle,
  Wifi,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function CommandCenterPage() {
  const { theme } = useUIStore();
  const { instances } = useInstanceStore();
  const [status, setStatus] = useState<'running' | 'stopped' | 'error'>('running');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Initializing Clawesome v2.0.4 gateway...',
    '[NETWORK] Listening on 127.0.0.1:4000',
    '[LOCAL] Local instance connection verified.',
    '[CLI] Agent Swarm "Prime" initialized.',
    '[SECURITY] Neural firewall activated.',
    '[TELEMETRY] Heartbeat signal stable (14ms)'
  ]);

  const typeCounts = instances.reduce((acc, inst) => {
    acc[inst.type] = (acc[inst.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[USER] Executing ${cmd.toUpperCase()} command...`]);
    
    if (cmd === 'stop') setStatus('stopped');
    if (cmd === 'start') setStatus('running');
    
    setTimeout(() => {
      setLogs(prev => [...prev, `[SYSTEM] Command ${cmd} processed at ${timestamp}`]);
    }, 500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Zap size={22} className={status === 'running' ? "animate-pulse" : ""} />
             </div>
             <h1 className="text-4xl font-black tracking-tight tracking-tighter uppercase italic">Command Center</h1>
          </div>
          <p className="text-slate-500 font-medium ml-1 flex items-center gap-2">
            Central orchestration node for your clawesome-gateway instance.
            <Info size={14} className="hover:text-indigo-500 cursor-help" />
          </p>
        </div>

        <div className={cn(
          "flex items-center gap-6 px-8 py-4 rounded-[2rem] border backdrop-blur-xl",
          theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        )}>
           <div className="flex items-center gap-3">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full",
                status === 'running' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500"
              )} />
              <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
           </div>
           <div className="h-8 w-px bg-slate-800/20" />
           <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Latency</span>
              <span className="text-sm font-black">12.4ms</span>
           </div>
           <div className="h-8 w-px bg-slate-800/20" />
           <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Uptime</span>
              <span className="text-sm font-black">4d 12h</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Bar & Quick Stats */}
        <div className="lg:col-span-2 space-y-8">
           {/* Control Bar */}
           <div className={cn(
             "glass-panel p-2 flex items-center justify-between rounded-[2.5rem]",
           )}>
              <div className="flex items-center gap-2 p-2">
                {[
                  { id: 'start', icon: <Play size={20} />, label: 'Start Gateway', color: 'text-emerald-500 hover:bg-emerald-500/10' },
                  { id: 'stop', icon: <Square size={20} />, label: 'Stop Services', color: 'text-rose-500 hover:bg-rose-500/10' },
                  { id: 'doctor', icon: <Activity size={20} />, label: 'Run Diagnostic', color: 'text-amber-500 hover:bg-amber-500/10' },
                  { id: 'exit', icon: <Power size={20} />, label: 'Kill Process', color: 'text-slate-500 hover:bg-slate-500/10' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => handleCommand(btn.id)}
                    className={cn(
                      "p-5 rounded-[1.5rem] transition-all duration-300 flex flex-col items-center gap-2 group relative",
                      btn.color
                    )}
                    title={btn.label}
                  >
                    {btn.icon}
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">
                      {btn.id}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 pr-10">
                 <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Auto-Scaling</span>
                    <span className="text-xs font-bold text-slate-500 italic">Enabled // Adaptive</span>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
                    <Cpu size={20} />
                 </div>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Laptop / Server', type: 'local', icon: <Monitor size={20} />, count: typeCounts['local'] || 0 },
                { label: 'Local Docker', type: 'docker', icon: <Database size={20} />, count: typeCounts['docker'] || 0 },
                { label: 'Clawesome Cloud', type: 'clawesome', icon: <Zap size={20} />, count: typeCounts['clawesome'] || 0 },
                { label: 'External Cloud', type: 'cloud', icon: <Cloud size={20} />, count: typeCounts['cloud'] || 0 },
              ].map((stat) => (
                <div key={stat.type} className="glass-panel p-6 rounded-[2rem] flex flex-col justify-between h-40 group hover:-translate-y-1 transition-transform">
                   <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {stat.icon}
                      </div>
                      <span className="text-4xl font-black italic text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/20 transition-colors">{stat.count}</span>
                   </div>
                   <div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Registry Stats</p>
                   </div>
                </div>
              ))}
           </div>

           {/* Activity Log / Terminal */}
           <div className={cn(
             "rounded-[2.5rem] border overflow-hidden flex flex-col h-[400px]",
             theme === 'dark' ? "bg-black border-slate-800" : "bg-slate-950 border-slate-200"
           )}>
             <header className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                   <TerminalIcon size={16} className="text-emerald-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Local Instance Gateway Log</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Live Output</span>
                </div>
             </header>
             <div className="flex-1 p-6 font-mono text-[12px] overflow-y-auto no-scrollbar space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                     <span className="text-slate-700 shrink-0">{i + 1}</span>
                     <span className={cn(
                       log.includes('[USER]') ? "text-indigo-400" : 
                       log.includes('[ERROR]') ? "text-rose-400" : 
                       log.includes('[SYSTEM]') ? "text-emerald-400/80" : "text-slate-300"
                     )}>
                       {log}
                     </span>
                  </div>
                ))}
                <div className="flex gap-4 animate-pulse">
                   <span className="text-slate-700">{logs.length + 1}</span>
                   <span className="w-2 h-4 bg-emerald-500/50" />
                </div>
             </div>
           </div>
        </div>

        {/* Info & Health Column */}
        <div className="space-y-8">
           <div className="glass-panel p-8 rounded-[2.5rem] space-y-10">
              <div>
                 <h4 className="text-xl font-bold italic tracking-tighter">System Health</h4>
                 <p className="text-sm text-slate-500 mt-2">Global infrastructure diagnostic summary across all registered gateways.</p>
              </div>

              <div className="space-y-6">
                 {[
                   { label: 'Neural Throughput', value: 'High', color: 'text-emerald-500' },
                   { label: 'API Integrity', value: 'Stable', color: 'text-emerald-500' },
                   { label: 'Memory Leakage', value: 'Minimal', color: 'text-emerald-500' },
                   { label: 'Encryption Layer', value: 'AES-256', color: 'text-indigo-500' },
                 ].map((h) => (
                   <div key={h.label} className="flex items-center justify-between group cursor-default">
                      <span className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-500 group-hover:text-slate-300 transition-colors">{h.label}</span>
                      <span className={cn("text-[11px] font-black uppercase tracking-widest", h.color)}>{h.value}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-slate-800/10 dark:border-slate-800">
                 <button className="w-full bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all group">
                    Full Diagnostic Report <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-indigo-600 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                 <Wifi size={100} />
              </div>
              <h4 className="text-lg font-black text-white italic tracking-tighter relative z-10">Gateway Remote</h4>
              <p className="text-white/70 text-xs mt-2 font-medium relative z-10">You can control this instance via the Clawesome CLI using: <code className="bg-white/10 px-2 py-0.5 rounded text-[10px]">clawesome remote join</code></p>
              <button className="mt-8 px-6 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl relative z-10 hover:scale-105 active:scale-95 transition-all">
                 Copy Invite Code
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
