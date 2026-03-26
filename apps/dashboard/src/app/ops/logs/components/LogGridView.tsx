import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Clock, ShieldCheck, ChevronRight, Check } from 'lucide-react';
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

interface LogGridViewProps {
  logs: LogEntry[];
  selectedIds: string[];
  theme: string;
  expandedId: string | null;
  onToggleSelection: (id: string) => void;
  onToggleExpand: (id: string) => void;
  getLevelBg: (level: string) => string;
}

export const LogGridView = ({
  logs,
  selectedIds,
  theme,
  expandedId,
  onToggleSelection,
  onToggleExpand,
  getLevelBg
}: LogGridViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              "transition-all cursor-pointer group relative overflow-hidden transition-all border shadow-xl flex flex-col p-8 rounded-[40px] h-full",
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
              "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer w-7 h-7 top-5 left-5",
              selectedIds.includes(log.id)
                ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
            )}>
              {selectedIds.includes(log.id) && <Check size={14} strokeWidth={4} />}
            </div>

            <div className="w-full relative z-10">
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
