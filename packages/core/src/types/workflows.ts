// packages/core/src/types/workflows.ts

export type WorkflowStatus = 'active' | 'paused' | 'running' | 'failed' | 'completed';

export interface WorkflowNode {
  id: string;
  type: string;
  data: {
    label: string;
    description?: string;
    input?: any;
    output?: any;
    status?: 'idle' | 'running' | 'completed' | 'failed';
    [key: string]: any;
  };
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
}

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  lastRun?: number;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  globalVariables?: Record<string, any>;
  secrets?: string[]; // IDs of secrets
}
