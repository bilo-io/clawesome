import { create } from 'zustand';

export interface Swarm {
  id: string;
  icon: string;
  name: string;
  path: string;
  status: string;
  color: string;
  agents: { id: string; color: string }[];
}

interface SwarmState {
  swarms: Swarm[];
  isLoading: boolean;
  error: string | null;
  fetchSwarms: () => Promise<void>;
  addSwarm: (swarm: Omit<Swarm, 'id'>) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const useSwarmStore = create<SwarmState>((set, get) => ({
  swarms: [],
  isLoading: false,
  error: null,

  fetchSwarms: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/swarms`);
      if (!response.ok) throw new Error('Failed to fetch swarms');
      const data = await response.json();
      set({ swarms: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSwarm: async (swarmData) => {
    try {
      const response = await fetch(`${API_URL}/swarms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swarmData),
      });
      if (!response.ok) throw new Error('Failed to add swarm');
      await get().fetchSwarms();
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
