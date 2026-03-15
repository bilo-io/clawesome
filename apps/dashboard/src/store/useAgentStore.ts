// apps/dashboard/src/store/useAgentStore.ts
import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  title: string;
  profilePicture: string; // base64 data URL or URL
  soulMarkdown: string;
  type: string;
  config: any;
  createdAt: number;
}

interface AgentState {
  agents: Agent[];
  currentAgent: Agent | null;
  isLoading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  fetchAgentById: (id: string) => Promise<void>;
  addAgent: (agent: Omit<Agent, 'id' | 'createdAt' | 'type' | 'config'> & { type?: string; config?: any }) => Promise<void>;
  updateAgent: (id: string, updates: Partial<Omit<Agent, 'id' | 'createdAt'>>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  getAgentById: (id: string) => Agent | undefined;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: [],
  currentAgent: null,
  isLoading: false,
  error: null,

  fetchAgents: async () => {
    set({ isLoading: true, error: null });
    console.log(`Fetching agents from: ${API_URL}/agents`);
    try {
      const response = await fetch(`${API_URL}/agents`);
      if (!response.ok) throw new Error('Failed to fetch agents');
      const data = await response.json();
      console.log('Received agents data:', data);
      
      const mappedAgents: Agent[] = data.map((a: any) => ({
        id: a.id,
        name: a.name,
        title: a.name,
        profilePicture: a.imageUrl || '',
        soulMarkdown: a.content,
        type: a.type,
        config: a.config,
        createdAt: new Date(a.createdAt).getTime(),
      }));
      
      set({ agents: mappedAgents, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAgentById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/agents/${id}`);
      if (!response.ok) throw new Error('Failed to fetch agent');
      const a = await response.json();
      
      const mappedAgent: Agent = {
        id: a.id,
        name: a.name,
        title: a.name,
        profilePicture: a.imageUrl || '',
        soulMarkdown: a.content,
        type: a.type,
        config: a.config,
        createdAt: new Date(a.createdAt).getTime(),
      };
      
      set({ currentAgent: mappedAgent, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addAgent: async (agentData) => {
    try {
      const response = await fetch(`${API_URL}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agentData.name,
          imageUrl: agentData.profilePicture,
          content: agentData.soulMarkdown,
          type: agentData.type || 'general',
          config: agentData.config || {},
        }),
      });
      if (!response.ok) throw new Error('Failed to add agent');
      await get().fetchAgents();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateAgent: async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updates.name,
          imageUrl: updates.profilePicture,
          content: updates.soulMarkdown,
          type: updates.type,
          config: updates.config,
        }),
      });
      if (!response.ok) throw new Error('Failed to update agent');
      await get().fetchAgents();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteAgent: async (id) => {
    try {
      const response = await fetch(`${API_URL}/agents/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete agent');
      set((state) => ({
        agents: state.agents.filter((agent) => agent.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  getAgentById: (id) => {
    return get().agents.find((agent) => agent.id === id);
  },
}));
