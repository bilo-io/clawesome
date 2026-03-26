'use client';

import { create } from 'zustand';
import { CouncilAgent } from '@clawesome/ui';

interface CouncilMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent?: CouncilAgent;
  timestamp: string;
  isInitialRecommendation?: boolean;
  actions?: Array<{
    label: string;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
}

interface CouncilSession {
  id: string;
  title: string;
  agents: CouncilAgent[];
  messages: CouncilMessage[];
  status: 'active' | 'concluded' | 'archived';
}

interface CouncilState {
  sessions: Record<string, CouncilSession>;
  activeSessionId: string | null;
  addMessage: (sessionId: string, message: Omit<CouncilMessage, 'id' | 'timestamp'>) => void;
  setAgents: (sessionId: string, agents: CouncilAgent[]) => void;
  createSession: (id: string, title: string, agents: CouncilAgent[]) => void;
}

export const mockAgents = [
    { id: 'a1', name: 'Architect', role: 'System Design', color: '#6366f1' },
    { id: 'a2', name: 'Security', role: 'Risk Mitigation', color: '#f43f5e' },
    { id: 'a3', name: 'Ethics', role: 'Alignment Guard', color: '#10b981' },
    { id: 'a4', name: 'Analyst', role: 'Data Intelligence', color: '#f59e0b' },
];

export const useCouncilStore = create<CouncilState>((set) => ({
  sessions: {
    'c1': {
      id: 'c1',
      title: 'Data Sovereignty Protocol',
      agents: mockAgents.slice(0, 3),
      status: 'active',
      messages: [
        {
          id: 'initial',
          role: 'system',
          isInitialRecommendation: true,
          content: "I've analyzed your initial context: 'Decentralizing data ownership for S3 clearance users'. I recommend a Council of 3 Agents to deliberate.",
          timestamp: '2 hours ago',
          actions: [
            { label: 'Approve & Sync', variant: 'primary', onClick: () => console.log('Approved') },
            { label: 'Optimize Agents', variant: 'secondary', onClick: () => console.log('Optimizing...') },
          ]
        }
      ]
    }
  },
  activeSessionId: null,

  addMessage: (sessionId, message) => set((state) => {
    const session = state.sessions[sessionId];
    if (!session) return state;

    const newMessage: CouncilMessage = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: 'Just now',
    };

    return {
      sessions: {
        ...state.sessions,
        [sessionId]: {
          ...session,
          messages: [...session.messages, newMessage],
        }
      }
    };
  }),

  setAgents: (sessionId, agents) => set((state) => {
    const session = state.sessions[sessionId];
    if (!session) return state;
    return {
      sessions: {
        ...state.sessions,
        [sessionId]: {
          ...session,
          agents,
        }
      }
    };
  }),

  createSession: (id, title, agents) => set((state) => ({
    sessions: {
      ...state.sessions,
      [id]: {
        id,
        title,
        agents,
        status: 'active',
        messages: [],
      }
    }
  })),
}));
