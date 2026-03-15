// apps/dashboard/src/store/useWorkflowStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workflow, WorkflowNode, WorkflowEdge } from '@antigravity/core';

interface WorkflowState {
  workflows: Workflow[];
  marketplaceWorkflows: Workflow[];
  isLoading: boolean;
  error: string | null;
  fetchWorkflows: () => Promise<void>;
  addWorkflow: (workflow: Omit<Workflow, 'id'>) => Promise<string>;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  getWorkflowById: (id: string) => Workflow | undefined;
  installWorkflow: (workflow: Workflow) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: [],
  marketplaceWorkflows: [],
  isLoading: false,
  error: null,

  fetchWorkflows: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/workflows`);
      if (!response.ok) throw new Error('Failed to fetch workflows');
      const data = await response.json();
      
      const workflows = data.filter((w: any) => !w.isMarketplace);
      const marketplaceWorkflows = data.filter((w: any) => w.isMarketplace);
      
      set({ workflows, marketplaceWorkflows, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addWorkflow: async (workflowData) => {
    try {
      const response = await fetch(`${API_URL}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflowData),
      });
      if (!response.ok) throw new Error('Failed to add workflow');
      const newWorkflow = await response.json();
      await get().fetchWorkflows();
      return newWorkflow.id;
    } catch (error: any) {
      set({ error: error.message });
      return '';
    }
  },

  updateWorkflow: async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/workflows/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update workflow');
      await get().fetchWorkflows();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteWorkflow: async (id) => {
    try {
      const response = await fetch(`${API_URL}/workflows/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete workflow');
      await get().fetchWorkflows();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  getWorkflowById: (id) => {
    return get().workflows.find((wf) => wf.id === id);
  },

  installWorkflow: async (workflow) => {
    if (get().workflows.some(w => w.name === workflow.name)) return;
    const { id, ...workflowWithoutId } = workflow;
    await get().addWorkflow({ ...workflowWithoutId, status: 'active', isMarketplace: false });
  }
}));

