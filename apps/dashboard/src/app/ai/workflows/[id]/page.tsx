'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { WorkflowEditor } from '@/components/workflows/WorkflowEditor';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { ChevronLeft, Trash2, History, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export default function WorkflowDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getWorkflowById, updateWorkflow, deleteWorkflow } = useWorkflowStore();
  const { theme } = useUIStore();
  
  const workflow = getWorkflowById(id as string);

  if (!workflow) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Mission Record Not Found</h2>
        <button 
          onClick={() => router.push('/workflows')}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to terminate this workflow?')) {
      deleteWorkflow(workflow.id);
      router.push('/workflows');
    }
  };

  const handleUpdate = React.useCallback((updates: Partial<typeof workflow>) => {
    updateWorkflow(workflow.id, updates);
  }, [updateWorkflow, workflow.id]);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 w-full max-w-[1700px] mx-auto overflow-hidden">
      <DashboardResourceHeader
        title={workflow.name}
        breadcrumbTitle={workflow.name}
        description="Workflow orchestration node. Configure mission parameters, define tactical branching, and monitor execution cycles in real-time."
        badge="WF-EDITOR"
        statusLabel="Lifecycle Sync:"
        statusValue={workflow.status.toUpperCase()}
        statusColor={workflow.status === 'active' ? 'emerald' : 'indigo'}
        isCollection={false}
        backLink={{
          label: 'Back to Workflows',
          href: '/workflows'
        }}
        renderRight={
          <div className="flex items-center gap-3">
            <button className={cn(
               "flex items-center gap-2 px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
               theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 shadow-sm"
            )}>
               <History size={14} /> Mission Logs
            </button>
            <button 
              onClick={handleDelete}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
                theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
              )}
            >
              <Trash2 size={14} /> Terminate
            </button>
          </div>
        }
      />

      <div className="flex-1 min-h-0">
        <WorkflowEditor 
          workflow={workflow} 
          onUpdate={handleUpdate} 
        />
      </div>
    </div>
  );
}
