'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Bell, Filter, ChevronRight, LayoutGrid, List, Search, ChevronDown, Clock, ShieldCheck, Box, Trash2, Copy, Download, Check } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';
import { LogGridView } from './components/LogGridView';
import { LogListView } from './components/LogListView';

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
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const viewMode = (getViewMode('/ops/logs', 'list') as 'grid' | 'list');

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const filteredLogs = MOCK_LOGS.filter(log => 
    log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected = filteredLogs.length > 0 && filteredLogs.every(log => selectedIds.includes(log.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredLogs.map(log => log.id));
    }
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Purge Logs ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Copy Sequence
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Download size={14} /> Export CSV
      </button>
    </>
  ) : null;
  const [expandedId, setExpandedId] = useState<string | null>(null);



  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="space-y-6 pb-20 max-w-[1400px] mx-auto">
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
        onViewModeChange={(mode: any) => setViewMode('/ops/logs', mode)}
        isCollection={true}
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
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

      <div className="relative">
        <AnimatePresence mode="popLayout">
          {viewMode === 'grid' ? (
            <LogGridView 
              logs={filteredLogs}
              selectedIds={selectedIds}
              theme={theme}
              expandedId={expandedId}
              onToggleSelection={toggleSelection}
              onToggleExpand={toggleExpand}
              getLevelBg={getLevelBg}
            />
          ) : (
            <div className="space-y-2">
              <LogListView 
                logs={filteredLogs}
                selectedIds={selectedIds}
                theme={theme}
                expandedId={expandedId}
                onToggleSelection={toggleSelection}
                onToggleExpand={toggleExpand}
                getLevelBg={getLevelBg}
              />
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
          )}
        </AnimatePresence>
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
