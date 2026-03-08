// apps/dashboard/src/store/useWorkflowStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workflow, WorkflowNode, WorkflowEdge } from '@antigravity/core';

interface WorkflowState {
  workflows: Workflow[];
  addWorkflow: (workflow: Omit<Workflow, 'id'>) => string;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  getWorkflowById: (id: string) => Workflow | undefined;
}

const mockWorkflows: Workflow[] = [
  {
    id: 'content-creator-001',
    name: 'Content Creator',
    status: 'active',
    lastRun: Date.now() - 3600000,
    nodes: [
      { id: 'start-1', type: 'start', position: { x: 50, y: 150 }, data: { label: 'Start (Daily Cron)', description: 'Runs daily at 9 AM' } },
      { id: 'input-1', type: 'agent', position: { x: 250, y: 150 }, data: { label: 'Input Prompt', description: 'Generate content strategy' } },
      { id: 'branch-1', type: 'logic', position: { x: 450, y: 150 }, data: { label: 'Branch', description: 'Split paths' } },
      { id: 'agent-img', type: 'agent', position: { x: 650, y: 50 }, data: { label: 'Image Agent', description: 'Generate cover image' } },
      { id: 'agent-vid', type: 'agent', position: { x: 650, y: 150 }, data: { label: 'Video Agent', description: 'Generate short clip' } },
      { id: 'agent-mus', type: 'agent', position: { x: 650, y: 250 }, data: { label: 'Music Agent', description: 'Generate background music' } },
      { id: 'gdrive-1', type: 'tool', position: { x: 850, y: 150 }, data: { label: 'Upload to GDrive', description: 'Cloud storage storage' } },
      { id: 'slack-fail', type: 'tool', position: { x: 1050, y: 250 }, data: { label: 'Slack Alert (Fail)', description: 'Notify on failure' } },
      { id: 'join-1', type: 'logic', position: { x: 1050, y: 150 }, data: { label: 'Join/Wait', description: 'Wait for all paths' } },
      { id: 'slack-success', type: 'tool', position: { x: 1250, y: 150 }, data: { label: 'Post to Slack', description: 'Notify team' } },
    ],
    edges: [
      { id: 'e1-2', source: 'start-1', target: 'input-1' },
      { id: 'e2-3', source: 'input-1', target: 'branch-1' },
      { id: 'eb-img', source: 'branch-1', target: 'agent-img' },
      { id: 'eb-vid', source: 'branch-1', target: 'agent-vid' },
      { id: 'eb-mus', source: 'branch-1', target: 'agent-mus' },
      { id: 'ei-gd', source: 'agent-img', target: 'gdrive-1' },
      { id: 'ev-gd', source: 'agent-vid', target: 'gdrive-1' },
      { id: 'em-gd', source: 'agent-mus', target: 'gdrive-1' },
      { id: 'egd-fail', source: 'gdrive-1', target: 'slack-fail', label: 'On Failure' },
      { id: 'egd-join', source: 'gdrive-1', target: 'join-1' },
      { id: 'ej-sl', source: 'join-1', target: 'slack-success' },
    ],
  },
  {
    id: 'capture-lead-002',
    name: 'Capture Lead',
    status: 'paused',
    lastRun: Date.now() - 7200000,
    nodes: [
      { id: 'http-1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'HTTP Endpoint', description: 'Webhook listener' } },
      { id: 'parser-1', type: 'tool', position: { x: 250, y: 100 }, data: { label: 'JSON Parser', description: 'Extract lead data' } },
      { id: 'db-1', type: 'tool', position: { x: 450, y: 100 }, data: { label: 'Write to DB', description: 'Store in SQLite' } },
      { id: 'slack-1', type: 'tool', position: { x: 650, y: 100 }, data: { label: 'Post to Slack', description: 'Alert sales team' } },
    ],
    edges: [
      { id: 'e1-2', source: 'http-1', target: 'parser-1' },
      { id: 'e2-3', source: 'parser-1', target: 'db-1' },
      { id: 'e3-4', source: 'db-1', target: 'slack-1' },
    ],
  },
];

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: mockWorkflows,
      addWorkflow: (workflowData) => {
        const id = crypto.randomUUID();
        const newWorkflow: Workflow = {
          ...workflowData,
          id,
        };
        set((state) => ({ workflows: [newWorkflow, ...state.workflows] }));
        return id;
      },
      updateWorkflow: (id, updates) => {
        set((state) => ({
          workflows: state.workflows.map((wf) =>
            wf.id === id ? { ...wf, ...updates } : wf
          ),
        }));
      },
      deleteWorkflow: (id) => {
        set((state) => ({
          workflows: state.workflows.filter((wf) => wf.id !== id),
        }));
      },
      getWorkflowById: (id) => {
        return get().workflows.find((wf) => wf.id === id);
      },
    }),
    {
      name: 'workflow-storage',
    }
  )
);
