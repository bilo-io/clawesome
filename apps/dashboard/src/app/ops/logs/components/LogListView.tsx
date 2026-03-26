import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Clock, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LogEntry {
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

interface LogListViewProps {
  logs: LogEntry[];
  selectedIds: string[];
  theme: string;
  expandedId: string | null;
  onToggleSelection: (id: string) => void;
  onToggleExpand: (id: string) => void;
  getLevelBg: (level: string) => string;
}

export const LogListView = ({
  logs,
  selectedIds,
  theme,
  expandedId,
  onToggleSelection,
  onToggleExpand,
  getLevelBg
}: LogListViewProps) => (
  <div className="space-y-2">
    <AnimatePresence mode="popLayout">
      {logs.map((log) => (
        <motion.div
          layout
          key={log.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div
            onClick={() => onToggleExpand(log.id)}
            className={cn(
              "transition-all cursor-pointer group relative overflow-hidden transition-all border shadow-xl flex flex-col p-4 px-8 rounded-[24px]",
              selectedIds.includes(log.id)
                ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
                : (theme === 'dark' 
                    ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30" 
                    : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-200 hover:shadow-2xl")
            )}
          >
            {/* Selection Indicator */}
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSelection(log.id);
              }}
              className={cn(
              "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer w-6 h-6 left-4 top-1/2 -translate-y-1/2",
              selectedIds.includes(log.id)
                ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
            )}>
              {selectedIds.includes(log.id) && <Check size={12} strokeWidth={4} />}
            </div>

            <div className="flex justify-between items-center relative z-10 flex-row pl-10">
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

            {/* Gradient Highlight */}
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
  </div>
);
