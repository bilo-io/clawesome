// apps/dashboard/src/store/useWorkflowStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workflow, WorkflowNode, WorkflowEdge } from '@antigravity/core';

interface WorkflowState {
  workflows: Workflow[];
  marketplaceWorkflows: Workflow[];
  addWorkflow: (workflow: Omit<Workflow, 'id'>) => string;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  getWorkflowById: (id: string) => Workflow | undefined;
  installWorkflow: (workflow: Workflow) => void;
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
    id: 'music-gen-002',
    name: 'Music Master',
    status: 'active',
    lastRun: Date.now() - 5000000,
    nodes: [
      { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'HTTP Trigger', description: 'Generate on request' } },
      { id: 'agent-1', type: 'agent', position: { x: 300, y: 100 }, data: { label: 'Melody Gen', description: 'Create core melody' } },
      { id: 'agent-2', type: 'agent', position: { x: 500, y: 100 }, data: { label: 'Harmony Gen', description: 'Add orchestration' } },
      { id: 'tool-1', type: 'tool', position: { x: 700, y: 100 }, data: { label: 'Export WAV', description: 'Final mixing' } },
    ],
    edges: [
      { id: 'e1-2', source: 'trigger-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'agent-2' },
      { id: 'e3-4', source: 'agent-2', target: 'tool-1' },
    ],
  },
  {
    id: 'research-slack-003',
    name: 'Research Buddy',
    status: 'active',
    lastRun: Date.now() - 9000000,
    nodes: [
      { id: 'cron-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Daily Research', description: 'Cron: 8 AM' } },
      { id: 'agent-1', type: 'agent', position: { x: 300, y: 100 }, data: { label: 'Web Scraper', description: 'Gather latest news' } },
      { id: 'agent-2', type: 'agent', position: { x: 500, y: 100 }, data: { label: 'Summarizer', description: 'Distill key points' } },
      { id: 'tool-1', type: 'tool', position: { x: 700, y: 100 }, data: { label: 'Slack Post', description: 'Notify #research-feed' } },
    ],
    edges: [
      { id: 'e1-2', source: 'cron-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'agent-2' },
      { id: 'e3-4', source: 'agent-2', target: 'tool-1' },
    ],
  },
  {
    id: 'social-media-004',
    name: 'Social Auto-Post',
    status: 'paused',
    lastRun: 0,
    nodes: [
      { id: 'start-1', type: 'start', position: { x: 50, y: 150 }, data: { label: 'Manual Trigger', description: 'Run when ready' } },
      { id: 'agent-1', type: 'agent', position: { x: 250, y: 150 }, data: { label: 'Reels Creator', description: 'AI Video Gen' } },
      { id: 'tool-1', type: 'tool', position: { x: 450, y: 150 }, data: { label: 'Instagram Graph', description: 'Publish to Feed' } },
    ],
    edges: [
      { id: 'e1-2', source: 'start-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'tool-1' },
    ],
  },
  {
    id: 'devops-bot-005',
    name: 'Git PR Summarizer',
    status: 'active',
    lastRun: Date.now() - 1000000,
    nodes: [
      { id: 'web-1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'GitHub Webhook', description: 'Listen for PRs' } },
      { id: 'agent-1', type: 'agent', position: { x: 250, y: 100 }, data: { label: 'Code Reviewer', description: 'Check for best practices' } },
      { id: 'tool-1', type: 'tool', position: { x: 450, y: 100 }, data: { label: 'PR Commenter', description: 'Post summary to GitHub' } },
    ],
    edges: [
      { id: 'e1-2', source: 'web-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'tool-1' },
    ],
  },
  {
    id: 'security-log-006',
    name: 'Anomaly Hunter',
    status: 'active',
    lastRun: Date.now() - 500000,
    nodes: [
      { id: 'log-1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'CloudWatch Logs', description: 'Streaming logs' } },
      { id: 'agent-1', type: 'agent', position: { x: 250, y: 100 }, data: { label: 'Security Agent', description: 'Detect unusual patterns' } },
      { id: 'tool-1', type: 'tool', position: { x: 450, y: 100 }, data: { label: 'PagerDuty', description: 'Alert On-Call Engine' } },
    ],
    edges: [
      { id: 'e1-2', source: 'log-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'tool-1' },
    ],
  },
  {
    id: 'ecom-tracker-007',
    name: 'Inventory Sync',
    status: 'active',
    lastRun: Date.now() - 2000000,
    nodes: [
      { id: 'shop-1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'Shopify Webhook', description: 'Order Placed' } },
      { id: 'agent-1', type: 'agent', position: { x: 250, y: 100 }, data: { label: 'Inventory Manager', description: 'Recalculate stock' } },
      { id: 'tool-1', type: 'tool', position: { x: 450, y: 100 }, data: { label: 'ERP Update', description: 'Sync with warehouse' } },
    ],
    edges: [
      { id: 'e1-2', source: 'shop-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'tool-1' },
    ],
  },
  {
    id: 'hr-screener-008',
    name: 'Candidate Ranker',
    status: 'paused',
    lastRun: 0,
    nodes: [
      { id: 'form-1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'Apply Portal', description: 'New Application' } },
      { id: 'agent-1', type: 'agent', position: { x: 250, y: 100 }, data: { label: 'CV Screener', description: 'Match skills to JD' } },
      { id: 'tool-1', type: 'tool', position: { x: 450, y: 100 }, data: { label: 'Schedule Invite', description: 'Send Calendly link' } },
    ],
    edges: [
      { id: 'e1-2', source: 'form-1', target: 'agent-1' },
      { id: 'e2-3', source: 'agent-1', target: 'tool-1' },
    ],
  },
];

const marketplaceWorkflows: Workflow[] = [
  { id: 'm-1', name: 'SEO Content Pillar', status: 'paused', nodes: [], edges: [] },
  { id: 'm-2', name: 'Zendesk Ticket Router', status: 'paused', nodes: [], edges: [] },
  { id: 'm-3', name: 'CSV Data Visualizer', status: 'paused', nodes: [], edges: [] },
  { id: 'm-4', name: 'Backlink Auditor', status: 'paused', nodes: [], edges: [] },
  { id: 'm-5', name: 'News Digest to Slack', status: 'paused', nodes: [], edges: [] },
  { id: 'm-6', name: 'Daily Competitor Monitor', status: 'paused', nodes: [], edges: [] },
  { id: 'm-7', name: 'Fitness Plan Tailor', status: 'paused', nodes: [], edges: [] },
  { id: 'm-8', name: 'Crypto Rebalancer', status: 'paused', nodes: [], edges: [] },
  { id: 'm-9', name: 'Resume Screener', status: 'paused', nodes: [], edges: [] },
  { id: 'm-10', name: 'Contract Extractor', status: 'paused', nodes: [], edges: [] },
  { id: 'm-11', name: 'Property Estimator', status: 'paused', nodes: [], edges: [] },
  { id: 'm-12', name: 'Travel Aggregator', status: 'paused', nodes: [], edges: [] },
  { id: 'm-13', name: 'Flashcard Gen', status: 'paused', nodes: [], edges: [] },
  { id: 'm-14', name: 'Discord Mod Bot', status: 'paused', nodes: [], edges: [] },
  { id: 'm-15', name: 'Copy A/B Tester', status: 'paused', nodes: [], edges: [] },
  { id: 'm-16', name: 'Anomal Detector', status: 'paused', nodes: [], edges: [] },
  { id: 'm-17', name: 'Symptom Checker', status: 'paused', nodes: [], edges: [] },
  { id: 'm-18', name: 'Meeting Summarizer', status: 'paused', nodes: [], edges: [] },
  { id: 'm-19', name: 'Palette Gen', status: 'paused', nodes: [], edges: [] },
  { id: 'm-20', name: 'Research Cross-Ref', status: 'paused', nodes: [], edges: [] },
  { id: 'm-21', name: 'Storm Alert', status: 'paused', nodes: [], edges: [] },
  { id: 'm-22', name: 'Smart Home Routine', status: 'paused', nodes: [], edges: [] },
  { id: 'm-23', name: 'Video Dubber', status: 'paused', nodes: [], edges: [] },
  { id: 'm-24', name: 'Podcast Chapter Gen', status: 'paused', nodes: [], edges: [] },
  { id: 'm-25', name: 'Live Sports Alert', status: 'paused', nodes: [], edges: [] },
  { id: 'm-26', name: 'Expense Categorizer', status: 'paused', nodes: [], edges: [] },
  { id: 'm-27', name: 'Code Migrator', status: 'paused', nodes: [], edges: [] },
  { id: 'm-28', name: 'Lead Multiplier', status: 'paused', nodes: [], edges: [] },
  { id: 'm-29', name: 'Uptime Guardian', status: 'paused', nodes: [], edges: [] },
  { id: 'm-30', name: 'Sentiment Scout', status: 'paused', nodes: [], edges: [] },
].map(m => ({
  ...m,
  status: m.status as any,
  lastRun: 0,
  nodes: [
    { id: 't1', type: 'trigger', position: { x: 50, y: 150 }, data: { label: 'Marketplace Entry', description: m.name } }
  ],
  edges: []
}));

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: mockWorkflows,
      marketplaceWorkflows: marketplaceWorkflows,
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
      installWorkflow: (workflow) => {
        if (get().workflows.some(w => w.name === workflow.name)) return;
        set(state => ({
          workflows: [{ ...workflow, id: crypto.randomUUID(), status: 'active' }, ...state.workflows]
        }));
      }
    }),
    {
      name: 'workflow-storage',
    }
  )
);
