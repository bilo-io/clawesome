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
  Play,
  PackageCheck,
  ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { WorkflowCard } from '@clawesome/ui';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ResourceSkeleton } from '@/components/ResourceSkeleton';

export default function WorkflowsPage() {
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const { workflows, marketplaceWorkflows, isLoading, addWorkflow, deleteWorkflow, updateWorkflow, installWorkflow, fetchWorkflows } = useWorkflowStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'my' | 'marketplace'>('my');
  const [searchQuery, setSearchQuery] = useState('');
  const viewMode = (getViewMode('/workflows', 'grid') as 'grid' | 'list');

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const currentWorkflows = activeTab === 'my' ? workflows : marketplaceWorkflows;

  const filteredWorkflows = currentWorkflows.filter(w => 
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
          <div className={cn(
            "flex items-center gap-2 p-1.5 rounded-full border transition-all shadow-xl",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
            <button
              onClick={() => setActiveTab('my')}
              className={cn(
                "flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                activeTab === 'my' 
                  ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20" 
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
              )}
            >
              <PackageCheck size={18} />
              <span>MY SYSTEMS</span>
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={cn(
                "flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                activeTab === 'marketplace' 
                  ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20" 
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
              )}
            >
              <ShoppingCart size={18} />
              <span>MARKETPLACE</span>
            </button>
            <div className="w-[1px] h-6 bg-slate-800 mx-2" />
            <button
              onClick={handleCreateWorkflow}
              className="flex items-center gap-3 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all active:scale-95"
            >
              <Plus size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Create</span>
            </button>
          </div>
        }
      />

      {isLoading ? (
        <ResourceSkeleton 
          viewMode={viewMode} 
          className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-4"
          )} 
        />
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
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
                <WorkflowCard 
                  workflow={workflow}
                  viewMode={viewMode}
                  isMarketplace={activeTab === 'marketplace'}
                  isImported={workflows.some(w => w.name === workflow.name)}
                  selected={selectedIds.includes(workflow.id)}
                  onToggleSelection={() => toggleSelection(workflow.id)}
                  onToggleStatus={(e) => handleToggleStatus(e, workflow.id, workflow.status)}
                  onInstall={() => installWorkflow(workflow)}
                  onClick={() => {
                    if (activeTab === 'my') router.push(`/workflows/${workflow.id}`);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

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
