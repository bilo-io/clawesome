'use client';

import React, { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  ChevronLeft, 
    // LayoutKanban, 
  Layout,
  Table as TableIcon, 
  FileText, 
  Plus, 
  Search,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  Target,
  Layers,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import Link from 'next/link';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

interface Task {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
  dueDate: string;
}

const MOCK_TASKS: Task[] = [
  { id: 'T-1', title: 'Implement Neural WebSocket Handshake', status: 'In Progress', priority: 'High', assignee: 'Apex-01', dueDate: '2026-03-07' },
  { id: 'T-2', title: 'Define Aether Protocol Schemas', status: 'Done', priority: 'Medium', assignee: 'Core-AI', dueDate: '2026-03-05' },
  { id: 'T-3', title: 'Optimize Gateway Latency for Swarms', status: 'Todo', priority: 'High', assignee: 'Synthetix', dueDate: '2026-03-10' },
  { id: 'T-4', title: 'Security Audit: Node Authentication', status: 'Review', priority: 'High', assignee: 'Apex-01', dueDate: '2026-03-08' },
  { id: 'T-5', title: 'Setup Activity Heatmap Aggregator', status: 'Todo', priority: 'Low', assignee: 'Core-AI', dueDate: '2026-03-12' },
  { id: 'T-6', title: 'Refactor Workspace State Persistence', status: 'In Progress', priority: 'Medium', assignee: 'Synthetix', dueDate: '2026-03-09' },
];

const MOCK_PLAN = `
# Project Plan: Neural Engine V2

## Overview
The goal of this project is to upgrade the core neural engine to support distributed multi-agent swarms with sub-10ms latency across global gateway nodes.

## Objectives
- **Phase 1: Connectivity**: Implement ultra-low latency WebSocket handshakes.
- **Phase 2: Orchestration**: Enable dynamic agent re-assignment based on node load.
- **Phase 3: Intelligence**: Deploy the new V2 reasoning model across the edge clusters.

## Milestones
1. [x] Core schema definition
2. [ ] Initial swarm stress test
3. [ ] Beta deployment to AMS-01 cluster

## Deployment Strategy
We will use a blue-green deployment strategy to ensure zero downtime for existing active sessions. All telemetry should be piped to the central security hub for real-time audit.
`;

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { theme } = useUIStore();
  const [activeTab, setActiveTab] = useState<'tasks' | 'plan'>('tasks');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const statuses: Task['status'][] = ['Todo', 'In Progress', 'Review', 'Done'];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-20">
      <DashboardResourceHeader
        title="Neural Engine V2"
        badge="Neural Swarm Engine"
        statusLabel="System Status:"
        statusValue="ACTIVE"
        statusColor="emerald"
        isCollection={false}
        backLink={{ label: 'Back to Projects', href: '/projects' }}
        renderRight={
          <div className={cn(
            "flex p-1.5 rounded-[24px] border transition-all shadow-xl",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
             <button
               onClick={() => setActiveTab('tasks')}
               className={cn(
                 "flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                 activeTab === 'tasks'
                   ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20"
                   : theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
               )}
             >
               <Layers size={14} />
               <span>Task Matrix</span>
             </button>
             <button
               onClick={() => setActiveTab('plan')}
               className={cn(
                 "flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                 activeTab === 'plan'
                   ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20"
                   : theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
               )}
             >
               <FileText size={14} />
               <span>Mission Plan</span>
             </button>
          </div>
        }
      />

      <AnimatePresence mode="wait">
        {activeTab === 'tasks' ? (
          <motion.div
            key="tasks-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="relative w-full md:max-w-md">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                 <input 
                    type="text" 
                    placeholder="FILTER TASKS..."
                    className={cn(
                      "w-full py-3.5 pl-12 pr-4 rounded-2xl border font-mono text-[10px] tracking-widest uppercase outline-none transition-all",
                      theme === 'dark' ? "bg-slate-950/50 border-slate-900 focus:border-indigo-500/50 text-indigo-200" : "bg-white border-slate-100 shadow-sm"
                    )}
                 />
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button 
                      onClick={() => setViewMode('kanban')}
                      className={cn("p-1.5 rounded-lg transition-all", viewMode === 'kanban' ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-500" : "text-slate-500")}
                    >
                      <Layout size={16} />
                    </button>
                    <button 
                      onClick={() => setViewMode('table')}
                      className={cn("p-1.5 rounded-lg transition-all", viewMode === 'table' ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-500" : "text-slate-500")}
                    >
                      <TableIcon size={16} />
                    </button>
                 </div>
                 <button className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus size={16} />
                    Create Task
                 </button>
              </div>
            </div>

            {viewMode === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {statuses.map(status => (
                  <div key={status} className={cn(
                    "flex flex-col gap-5 p-3 rounded-2xl border transition-colors",
                    theme === 'dark' 
                      ? "bg-slate-900/20 border-slate-800/40" 
                      : status === 'Todo' ? "bg-slate-50 border-slate-200/50 shadow-sm" :
                        status === 'In Progress' ? "bg-indigo-50/20 border-indigo-100/40 shadow-sm" :
                        status === 'Review' ? "bg-amber-50/20 border-amber-100/40 shadow-sm" :
                        "bg-emerald-50/20 border-emerald-100/40 shadow-sm"
                  )}>
                    <div className="flex items-center justify-between px-2 pt-1">
                       <h3 className={cn(
                         "text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-2",
                         status === 'Todo' ? "text-rose-500" :
                         status === 'In Progress' ? "text-orange-500" :
                         status === 'Review' ? "text-amber-500" :
                         "text-emerald-500"
                       )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0",
                            status === 'Todo' ? "bg-rose-500" :
                            status === 'In Progress' ? "bg-orange-500" :
                            status === 'Review' ? "bg-amber-500" :
                            "bg-emerald-500"
                          )} />
                          {status} <span className="opacity-40 font-mono">/{MOCK_TASKS.filter(t => t.status === status).length}</span>
                       </h3>
                    </div>
                    
                    <div className="space-y-4">
                       {MOCK_TASKS.filter(t => t.status === status).map((task, i) => (
                         <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.1 }}
                           key={task.id}
                            className={cn(
                              "p-5 rounded-xl border transition-all hover:shadow-lg cursor-pointer group",
                              theme === 'dark' ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/30" : "bg-white border-slate-200/60 shadow-sm hover:shadow-indigo-500/5"
                            )}
                         >
                            <div className="flex justify-between items-start mb-4">
                               <span className={cn(
                                 "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter border",
                                 task.priority === 'High' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" :
                                 task.priority === 'Medium' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                 "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                               )}>
                                  {task.priority}
                               </span>
                               <button className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal size={14} />
                               </button>
                            </div>
                            <h4 className={cn("text-sm font-bold leading-relaxed mb-6", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
                               {task.title}
                            </h4>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-500/10">
                               <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[8px] font-black text-white">
                                     {task.assignee.charAt(0)}
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-500 uppercase">{task.assignee}</span>
                               </div>
                               <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600">
                                  <Clock size={10} />
                                  {task.dueDate.split('-').slice(1).join('/')}
                               </div>
                            </div>
                         </motion.div>
                       ))}
                       
                       <button className={cn(
                         "w-full py-8 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 transition-all",
                         theme === 'dark' ? "border-slate-800 hover:border-indigo-500/30 text-slate-700 hover:text-indigo-400 bg-black/10" : "border-slate-200 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 bg-slate-50/50"
                       )}>
                          <div className="p-1.5 rounded-lg bg-slate-500/5">
                             <Plus size={16} />
                          </div>
                          <span className="text-[8px] font-black tracking-[0.2em] uppercase">Engage Slot</span>
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={cn(
                "rounded-[40px] border overflow-hidden shadow-2xl",
                theme === 'dark' ? "bg-slate-900/30 border-slate-900" : "bg-white border-slate-100"
              )}>
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className={cn("border-b", theme === 'dark' ? "border-slate-800 bg-black/40" : "border-slate-100 bg-slate-50/80")}>
                          <th className="p-8 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500 w-[100px]">ID</th>
                          <th className="p-8 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">Operation / Activity</th>
                          <th className="p-8 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">Protocol Status</th>
                          <th className="p-8 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">Priority</th>
                          <th className="p-8 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">Unit</th>
                          <th className="p-8 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500 text-right">Cycle End</th>
                       </tr>
                    </thead>
                    <tbody>
                       {MOCK_TASKS.map((task, i) => (
                         <tr key={task.id} className={cn(
                           "border-b transition-colors group",
                           theme === 'dark' ? "border-slate-800/50 hover:bg-slate-900/50" : "border-slate-100 hover:bg-slate-50/50"
                         )}>
                            <td className="p-8 font-mono text-xs font-black text-indigo-500 opacity-60">#{task.id}</td>
                            <td className="p-8">
                               <div className="flex items-center gap-3">
                                  {task.status === 'Done' ? <CheckCircle2 className="text-emerald-500" size={16} /> : <Circle className="text-slate-700" size={16} />}
                                  <span className={cn("text-sm font-bold tracking-tight", theme === 'dark' ? "text-slate-300" : "text-slate-800")}>{task.title}</span>
                               </div>
                            </td>
                            <td className="p-8">
                               <div className={cn(
                                 "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                                 task.status === 'Done' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                 task.status === 'In Progress' ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                                 task.status === 'Review' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                 "bg-slate-500/10 text-slate-500 border-slate-500/20"
                               )}>
                                  <div className={cn("w-1.5 h-1.5 rounded-full", 
                                    task.status === 'Done' ? 'bg-emerald-500' :
                                    task.status === 'In Progress' ? 'bg-indigo-500' :
                                    task.status === 'Review' ? 'bg-amber-500' : 'bg-slate-500'
                                  )} />
                                  {task.status}
                               </div>
                            </td>
                            <td className="p-8">
                               <span className={cn(
                                 "text-[10px] font-black uppercase tracking-widest",
                                 task.priority === 'High' ? "text-rose-500" :
                                 task.priority === 'Medium' ? "text-amber-500" : "text-emerald-500"
                               )}>
                                  {task.priority}
                               </span>
                            </td>
                            <td className="p-8 font-bold text-xs uppercase text-slate-500">{task.assignee}</td>
                            <td className="p-8 text-right font-mono text-[10px] font-black text-slate-600">{task.dueDate}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="plan-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12"
          >
             {/* Plan Content */}
             <div className={cn(
               "lg:col-span-3 p-12 md:p-20 rounded-[64px] border prose prose-indigo max-w-none transition-all",
               theme === 'dark' 
                ? "bg-slate-900/30 border-slate-800/60 prose-invert prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white prose-p:text-slate-400 prose-p:font-medium prose-li:text-slate-400" 
                : "bg-white border-slate-100 shadow-2xl shadow-slate-200/40 prose-headings:font-black prose-headings:uppercase prose-p:font-medium text-slate-700"
             )}>
                <ReactMarkdown>{MOCK_PLAN}</ReactMarkdown>
             </div>

             {/* Plan Meta */}
             <div className="space-y-8 flex flex-col">
                <section className={cn(
                  "p-8 rounded-[40px] border flex flex-col gap-8 shadow-xl",
                  theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100"
                )}>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
                         <Target size={20} />
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Plan Metrics</h4>
                   </div>
                   
                   <div className="space-y-8">
                      <div className="flex flex-col gap-1.5">
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
                            Execution Progress
                            <span className="text-white font-black">42%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[42%] shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                         </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
                            Neural Fidelity
                            <span className="text-white font-black">98.4%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden text-emerald-500 font-black">
                            <div className="h-full bg-emerald-500 w-[98.4%] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                         </div>
                      </div>
                   </div>
                </section>

                <section className={cn(
                   "p-8 rounded-[40px] border flex-1 flex flex-col gap-8 shadow-xl relative overflow-hidden",
                   theme === 'dark' ? "bg-indigo-600/5 border-indigo-500/20" : "bg-indigo-50/30 border-indigo-100"
                )}>
                   <div className="flex items-center gap-3 relative z-10">
                      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600">
                         <Layers size={20} />
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600/60">Module Dependencies</h4>
                   </div>
                   
                   <div className="space-y-6 relative z-10">
                      {['NC-CORE-V2', 'NC-SWARM-MGR', 'NC-GATEWAY-AUTH'].map(dep => (
                        <div key={dep} className={cn(
                          "p-4 rounded-2xl border flex items-center justify-between group cursor-pointer",
                          theme === 'dark' ? "bg-black/40 border-slate-800 hover:border-indigo-500/40" : "bg-white border-slate-100 hover:border-indigo-300 shadow-sm"
                        )}>
                           <span className="font-mono text-[11px] font-black text-slate-500 group-hover:text-indigo-400 transition-colors uppercase">{dep}</span>
                           <ArrowRight size={14} className="text-slate-800 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
                        </div>
                      ))}
                   </div>

                   <div className="mt-auto relative z-10">
                      <button className="w-full py-5 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-2xl font-black text-[11px] tracking-[0.4em] uppercase shadow-2xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden group">
                         <Zap size={16} fill="white" className="group-hover:animate-pulse" />
                         SYNC ARCHIVE
                      </button>
                   </div>
                   
                   <div className="absolute -bottom-10 -right-10 opacity-5 -rotate-12 translate-x-4 translate-y-4">
                      <Zap size={200} fill="currentColor" />
                   </div>
                </section>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
