'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  ChevronRight,
  Clock,
  CircleDot,
  Search,
  Plus,
  Trash2,
  Copy,
  Zap,
  Check,
  Pause,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function WorkflowsPage() {
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const { workflows, addWorkflow, deleteWorkflow, updateWorkflow } = useWorkflowStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const viewMode = (getViewMode('/workflows', 'grid') as 'grid' | 'list');

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const filteredWorkflows = workflows.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected = filteredWorkflows.length > 0 && filteredWorkflows.every(w => selectedIds.includes(w.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredWorkflows.map(w => w.id));
    }
  };

  const handleToggleStatus = (e: React.MouseEvent, id: string, currentStatus: string) => {
    e.preventDefault();
    e.stopPropagation();
    updateWorkflow(id, { status: currentStatus === 'active' ? 'paused' : 'active' });
  };

  const handleCreateWorkflow = () => {
    const id = addWorkflow({
      name: 'New Workflow',
      status: 'active',
      lastRun: 0,
      nodes: [
        { 
          id: 'trigger-1', 
          type: 'trigger', 
          position: { x: 50, y: 150 }, 
          data: { 
            label: 'Trigger Node', 
            description: 'Mission entry point',
            type: 'TRIGGER'
          } 
        }
      ],
      edges: [],
    });
    router.push(`/workflows/${id}`);
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Delete Selected ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Duplicate
      </button>
    </>
  ) : null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <DashboardResourceHeader
        title="Workflows"
        description="Automate complex multi-agent tasks and service integrations. Orchestrate mission-critical procedures with precision and real-time monitoring."
        badge="NC-WORKFLOWS"
        statusLabel="Automation Hub:"
        statusValue="OPERATIONAL"
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="SEARCH WORKFLOWS..."
        viewMode={viewMode}
        onViewModeChange={(mode: any) => setViewMode('/workflows', mode)}
        isCollection={true}
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
        renderRight={
          <button
            onClick={handleCreateWorkflow}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Create Workflow</span>
          </button>
        }
      />

      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
          : "space-y-4"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredWorkflows.map((workflow, idx) => (
            <motion.div
              layout
              key={workflow.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/workflows/${workflow.id}`} className="group block relative transition-all">
                {viewMode === 'grid' ? (
                  <div className={cn(
                    "relative h-full p-8 rounded-[48px] border transition-all overflow-hidden",
                    selectedIds.includes(workflow.id)
                      ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
                      : (theme === 'dark' 
                          ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                          : "bg-white border-slate-100 shadow-2xl shadow-slate-200/40 hover:border-indigo-200")
                  )}>
                    {/* Selection Indicator */}
                    <div 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelection(workflow.id);
                      }}
                      className={cn(
                        "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all absolute top-6 left-6 z-30 cursor-pointer",
                        selectedIds.includes(workflow.id)
                          ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                          : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
                      )}
                    >
                      {selectedIds.includes(workflow.id) && <Check size={14} strokeWidth={4} />}
                    </div>

                    <div className="flex justify-between items-start mb-10">
                      <div className="flex flex-col gap-1">
                        <span className={cn(
                          "text-[10px] font-black tracking-widest uppercase mb-1",
                          theme === 'dark' ? "text-slate-600" : "text-slate-400"
                        )}>
                          TYPE: AUTOMATION
                        </span>
                        <h3 className={cn(
                          "text-2xl font-black group-hover:text-indigo-500 transition-colors uppercase tracking-tight truncate whitespace-nowrap",
                          theme === 'dark' ? "text-white" : "text-slate-900"
                        )}>
                          {workflow.name}
                        </h3>
                      </div>
                      <button 
                        onClick={(e) => handleToggleStatus(e, workflow.id, workflow.status)}
                        className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border transition-all hover:scale-105 active:scale-95",
                          workflow.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        )}
                      >
                        {workflow.status}
                      </button>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                         <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <Zap size={12} className="text-indigo-500" />
                                Nodes Count
                             </div>
                             <span className={cn("text-2xl font-black font-mono pl-1", theme === 'dark' ? "text-white" : "text-black")}>
                                {workflow.nodes.length}
                             </span>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                                Last Run
                                <Clock size={12} className="text-indigo-500" />
                             </div>
                             <span className={cn("text-xs font-bold font-mono", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                                {workflow.lastRun ? formatDistanceToNow(workflow.lastRun) + ' ago' : 'Never'}
                             </span>
                          </div>
                      </div>

                      <div className="flex gap-2">
                        {workflow.nodes.slice(0, 5).map((node, i) => (
                          <div key={i} className={cn(
                            "w-8 h-8 rounded-lg border flex items-center justify-center transition-all",
                            theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                          )} title={node.data.label}>
                            <CircleDot size={14} className="text-indigo-500" />
                          </div>
                        ))}
                        {workflow.nodes.length > 5 && (
                          <div className={cn(
                            "w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-bold",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
                          )}>
                            +{workflow.nodes.length - 5}
                          </div>
                        )}
                      </div>

                      <div className={cn(
                        "pt-6 border-t flex items-center justify-between",
                        theme === 'dark' ? "border-slate-800/50" : "border-slate-100"
                      )}>
                         <div className="flex items-center gap-3">
                            <button className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                              workflow.status === 'active' 
                                ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" 
                                : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                            )}>
                               {workflow.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                            </button>
                         </div>
                         <div className="flex items-center gap-1 group-hover:gap-2 transition-all text-[#8C00FF] font-black text-[11px] uppercase tracking-widest">
                            EDITOR VIEW
                            <ChevronRight size={14} />
                         </div>
                      </div>
                    </div>

                    {/* Industrial background accent */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Workflow size={60} />
                    </div>
                  </div>
                ) : (
                  <div className={cn(
                    "p-4 rounded-[28px] border flex items-center gap-6 transition-all relative pl-16",
                    selectedIds.includes(workflow.id)
                      ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
                      : (theme === 'dark' 
                          ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                          : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200")
                  )}>
                    {/* Selection Indicator for List */}
                    <div 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelection(workflow.id);
                      }}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all absolute left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer",
                        selectedIds.includes(workflow.id)
                          ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                          : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
                      )}
                    >
                      {selectedIds.includes(workflow.id) && <Check size={12} strokeWidth={4} />}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                      <Workflow size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={cn("text-lg font-black uppercase tracking-tight truncate max-w-md", theme === 'dark' ? "text-white" : "text-slate-900")}>
                          {workflow.name}
                        </h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border",
                          workflow.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        )}>
                          {workflow.status}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">TYPE: AUTOMATION</p>
                    </div>
                    <div className="flex flex-col items-end min-w-[150px]">
                      <span className={cn("text-base font-black font-mono", theme === 'dark' ? "text-white" : "text-black")}>
                        {workflow.nodes.length} NODES
                      </span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                        LAST RUN: {workflow.lastRun ? formatDistanceToNow(workflow.lastRun) + ' ago' : 'Never'}
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredWorkflows.length === 0 && (
         <div className="py-40 text-center flex flex-col items-center gap-6">
            <div className="p-10 rounded-full bg-slate-100 dark:bg-slate-900/50 text-slate-400 border border-slate-200 dark:border-slate-800 shadow-inner">
               <Search size={48} className="opacity-20" />
            </div>
            <div>
               <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Empty Workflow Void</h3>
               <p className="text-slate-500 font-medium">No automations found matching your neural signature.</p>
            </div>
         </div>
      )}
    </div>
  );
}
