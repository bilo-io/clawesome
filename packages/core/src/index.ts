// packages/core/src/index.ts

export interface AgentSession {
  id: string;
  startTime: number;
  status: 'active' | 'completed' | 'failed';
}

export interface SubAgentTask {
  id: string;
  title: string;
  status: 'queued' | 'active' | 'completed';
}

export interface GatewayEvent {
  type: string;
  payload: any;
}

export const DEFAULT_PORT = 17654;
