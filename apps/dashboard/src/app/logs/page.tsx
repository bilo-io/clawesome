'use client';

import React, { useState } from 'react';
import { Terminal, Activity, Bell, Filter, ChevronRight, LayoutGrid, List, Search, ChevronDown, Clock, ShieldCheck, Box } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'EXEC' | 'WARN' | 'SUCCESS' | 'ERROR';
  module: string;
  message: string;
  details?: {
    rawOutput?: string;
    environment?: string;
    stackTrace?: string;
    duration?: string;
  };
}

const MOCK_LOGS: LogEntry[] = [
  { 
    id: '1', 
    time: '01:23:45', 
    level: 'INFO', 
    module: 'CORE', 
    message: 'Agent swarm initiated in sandbox-01',
    details: {
      environment: 'production-us-east-1',
      duration: '450ms',
      rawOutput: 'Initializing neural link... \n[OK] Swarm size: 5\n[OK] Isolation level: L2'
    }
  },
  { 
    id: '2', 
    time: '01:23:48', 
    level: 'EXEC', 
    module: 'BASH', 
    message: 'bun run build --filter dashboard',
    details: {
      rawOutput: 'bun build v1.0.0\n  - dashboard [DONE] 1.2s\n  - website [SKIPPED]',
      duration: '1240ms'
    }
  },
  { 
    id: '3', 
    time: '01:24:02', 
    level: 'WARN', 
    module: 'NET', 
    message: 'Inbound socket latency > 200ms',
    details: {
      environment: 'edge-node-04',
      rawOutput: 'Warning: [NET-78] Latency spike detected. Current: 245ms. Threshold: 200ms.'
    }
  },
  { 
    id: '4', 
    time: '01:24:15', 
    level: 'INFO', 
    module: 'OS', 
    message: 'Memory pressure detected - clearing buffers',
    details: {
      environment: 'clawesome-main-node',
      rawOutput: 'Mem: 94% utilized. Triggering GC sweep...\n[OK] Reclaimed 452MB.'
    }
  },
  { 
    id: '5', 
    time: '01:25:01', 
    level: 'SUCCESS', 
    module: 'CORE', 
    message: 'Mission phase 2 synchronized successfully',
    details: {
      duration: '15.4s',
      rawOutput: 'Phase 2: Data Extraction [COMPLETE]\nPhase 3: Vector Encoding [READY]'
    }
  },
  { 
    id: '6', 
    time: '01:25:30', 
    level: 'EXEC', 
    module: 'PY', 
    message: 'python3 scripts/neural_optimizer.py --lr 0.001 --epochs 50',
    details: {
      environment: 'training-gpu-cluster-01',
      duration: '2h 14m',
      rawOutput: 'Epoch 1/50: loss 0.452\nEpoch 50/50: loss 0.002\n[OK] Model weights saved.'
    }
  },
  { 
    id: '7', 
    time: '01:26:12', 
    level: 'ERROR', 
    module: 'AUTH', 
    message: 'Unauthorized access attempt detected from 192.168.1.105',
    details: {
      environment: 'auth-gateway-primary',
      rawOutput: 'Security Exception: [AUTH-403] Origin block triggered. Protocol: SSH-2.0.'
    }
  },
  { 
    id: '8', 
    time: '01:26:45', 
    level: 'INFO', 
    module: 'DOCKER', 
    message: 'Container night-claw-worker-09 provisioned',
    details: {
      environment: 'k8s-neural-fleet',
      rawOutput: 'Image: clawesome/worker:latest\nStatus: Running\nPort mapping: 8080->80'
    }
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'EXEC': return 'text-indigo-400';
    case 'WARN': return 'text-amber-500';
    case 'SUCCESS': return 'text-emerald-500';
    case 'ERROR': return 'text-rose-500';
    default: return 'text-slate-400';
  }
};

const getLevelBg = (level: string) => {
  switch (level) {
    case 'EXEC': return 'bg-indigo-500/10 text-indigo-400';
    case 'WARN': return 'bg-amber-500/10 text-amber-500';
    case 'SUCCESS': return 'bg-emerald-500/10 text-emerald-500';
    case 'ERROR': return 'bg-rose-500/10 text-rose-500';
    default: return 'bg-slate-500/10 text-slate-400';
  }
};

export default function LogsPage() {
  const { theme } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLogs = MOCK_LOGS.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="space-y-10 pb-20 max-w-[1400px] mx-auto">
      <DashboardResourceHeader
        title="Logs"
        description="High-fidelity traceability stream monitoring system-level operations, neural link events, and mission execution traces."
        badge="NC-STREAM"
        statusLabel="Operational Status:"
        statusValue="Live Feed"
        statusColor="emerald"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        renderRight={
          <div className="flex items-center gap-4 h-[56px]">
            <button className={cn(
              "px-6 h-full rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm active:scale-95",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
            )}>
                <Filter size={16} /> SET VERBOSITY
            </button>
            <button className="px-6 h-full bg-gradient-to-r from-[#8C00FF] to-[#008FD6] rounded-full text-[10px] font-bold text-white uppercase tracking-widest transition-all shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2">
                <Bell size={16} /> ALERTS (2)
            </button>
          </div>
        }
      />

      <div className={cn(
        "transition-all duration-500",
        viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredLogs.map((log) => (
            <motion.div
              layout
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div
                onClick={() => toggleExpand(log.id)}
                className={cn(
                  "transition-all cursor-pointer group relative overflow-hidden transition-all border shadow-xl flex flex-col",
                  viewMode === 'list' ? "p-4 px-8 rounded-[24px]" : "p-8 rounded-[40px] h-full",
                  theme === 'dark' 
                    ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30" 
                    : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-200 hover:shadow-2xl"
                )}
              >
                <div className={cn(
                  "flex justify-between items-center relative z-10",
                  viewMode === 'list' ? "flex-row" : "flex-col items-start gap-4"
                )}>
                {viewMode === 'list' ? (
                  <>
                    <div className="flex items-center gap-10 flex-1">
                      <span className={cn("w-20 tabular-nums font-bold opacity-40", theme === 'light' && "text-slate-400")}>{log.time}</span>
                      <div className={cn("px-4 py-1 rounded-xl text-[9px] font-black tracking-widest min-w-[80px] text-center", getLevelBg(log.level))}>
                        {log.level}
                      </div>
                      <span className={cn("w-20 font-black uppercase tracking-widest text-[10px]", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>{log.module}</span>
                      <span className={cn("font-medium truncate max-w-2xl", theme === 'dark' ? "text-slate-200 group-hover:text-white" : "text-slate-800 group-hover:text-indigo-600")}>
                        {log.message}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                       <ChevronDown size={18} className={cn(
                          "transition-transform duration-300 opacity-20 group-hover:opacity-100",
                          expandedId === log.id ? "rotate-180" : ""
                        )} />
                    </div>
                  </>
                ) : (
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-6 w-full">
                      <div className={cn("px-4 py-1 rounded-xl text-[10px] font-black tracking-widest", getLevelBg(log.level))}>
                        {log.level}
                      </div>
                      <span className="text-[10px] font-black opacity-40 tabular-nums">{log.time}</span>
                    </div>
                    
                    <h3 className={cn("text-lg font-black tracking-tight mb-2 uppercase", theme === 'dark' ? "text-white" : "text-slate-900")}>
                      {log.module}
                    </h3>
                    <p className={cn("text-sm font-medium leading-relaxed italic", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
                      "{log.message}"
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                       <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className={cn("w-6 h-6 rounded-full border-2", theme === 'dark' ? "bg-slate-800 border-slate-900" : "bg-slate-100 border-white")} />
                          ))}
                       </div>
                       <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-all">
                          <span className="text-[9px] font-black uppercase tracking-widest">Trace Detail</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  </div>
                )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === log.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="w-full mt-4 pt-6 border-t border-white/10 dark:border-slate-800/50 relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-4">
                         <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Environment</span>
                            <div className="flex items-center gap-2">
                               <Box size={14} className="text-indigo-500" />
                               <span className="font-bold text-sm tracking-tight">{log.details?.environment || 'N/A'}</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Duration</span>
                            <div className="flex items-center gap-2">
                               <Clock size={14} className="text-emerald-500" />
                               <span className="font-bold text-sm tracking-tight">{log.details?.duration || 'N/A'}</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Integrity</span>
                            <div className="flex items-center gap-2 text-emerald-500">
                               <ShieldCheck size={14} />
                               <span className="font-black text-[10px] tracking-widest">VERIFIED</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-3 mt-4">
                         <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Raw Neural Trace</span>
                         <pre className={cn(
                           "p-6 rounded-2xl border text-[11px] font-mono leading-relaxed overflow-x-auto",
                           theme === 'dark' ? "bg-black/40 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600 shadow-inner"
                         )}>
                           {log.details?.rawOutput || 'No trace data captured for this event.'}
                         </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gradient Highlight (Matches WorkspaceGallery) */}
                <div className={cn(
                  "absolute -right-10 -bottom-10 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity",
                  log.level === 'EXEC' && 'bg-indigo-500',
                  log.level === 'SUCCESS' && 'bg-emerald-500',
                  log.level === 'WARN' && 'bg-amber-500',
                  log.level === 'ERROR' && 'bg-rose-500',
                  (log.level === 'INFO' || !log.level) && 'bg-slate-500'
                )} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {viewMode === 'list' && (
          <div className={cn(
            "p-8 flex items-center justify-center gap-4 text-indigo-500/50 font-black italic rounded-[24px] glass",
            theme === 'dark' ? "border-slate-900" : "border-slate-100"
          )}>
             <span className="animate-pulse text-lg">_</span>
             <span className="text-[11px] uppercase tracking-[0.3em]">Awaiting incoming trace pulses...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Events / Hour', value: '4.2k', icon: Activity, color: 'text-indigo-500' },
           { label: 'Bash Executions', value: '842', icon: Terminal, color: 'text-emerald-500' },
           { label: 'Audit Points', value: '1.5k', icon: Search, color: 'text-amber-500' },
         ].map((stat, i) => (
            <div key={i} className={cn(
              "p-8 rounded-[32px] transition-all shadow-xl flex items-center gap-6 group glass",
              theme === 'dark' ? "border-slate-800/60" : "border-slate-100"
            )}>
               <div className={cn("p-4 bg-opacity-10 rounded-2xl border border-transparent group-hover:scale-110 transition-transform", stat.color.replace('text', 'bg'))}>
                  <stat.icon size={28} className={stat.color} />
               </div>
               <div>
                  <span className={cn("block text-3xl font-black tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-950")}>{stat.value}</span>
                  <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>{stat.label}</span>
               </div>
            </div>
         ))}
      </div>
    </main>
  );
}
