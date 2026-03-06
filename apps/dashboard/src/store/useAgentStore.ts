// apps/dashboard/src/store/useAgentStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  name: string;
  title: string;
  profilePicture: string; // base64 data URL
  soulMarkdown: string;
  createdAt: number;
}

interface AgentState {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, 'id' | 'createdAt'>) => void;
  updateAgent: (id: string, updates: Partial<Omit<Agent, 'id' | 'createdAt'>>) => void;
  deleteAgent: (id: string) => void;
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      agents: [],
      addAgent: (agentData) => {
        const newAgent: Agent = {
          ...agentData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        set((state) => ({ agents: [newAgent, ...state.agents] }));
      },
      updateAgent: (id, updates) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === id ? { ...agent, ...updates } : agent
          ),
        }));
      },
      deleteAgent: (id) => {
        set((state) => ({
          agents: state.agents.filter((agent) => agent.id !== id),
        }));
      },
      getAgentById: (id) => {
        return get().agents.find((agent) => agent.id === id);
      },
    }),
    {
      name: 'agent-storage',
    }
  )
);
