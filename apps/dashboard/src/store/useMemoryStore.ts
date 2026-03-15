import { create } from 'zustand';

export const MAX_DOCUMENTS = 10;

export type DataType = 'link' | 'youtube' | 'pdf' | 'text';

export interface DataPoint {
  id: string;
  type: DataType;
  name: string;
  content: string;
  status: 'processing' | 'ready';
  timestamp: string;
}

export interface Memory {
  id: string;
  name: string;
  documents: DataPoint[];
  lastUpdated: string;
}

interface MemoryStore {
  memories: Memory[];
  isLoading: boolean;
  error: string | null;
  fetchMemories: () => Promise<void>;
  addMemory: (name: string) => Promise<void>;
  addDataPoint: (memoryId: string, type: DataType, name: string, content: string) => Promise<void>;
  updateDataPointStatus: (memoryId: string, dataPointId: string, status: 'processing' | 'ready') => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  memories: [],
  isLoading: false,
  error: null,

  fetchMemories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/memories`);
      if (!response.ok) throw new Error('Failed to fetch memories');
      const data = await response.json();
      set({ memories: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addMemory: async (name: string) => {
    try {
      const response = await fetch(`${API_URL}/memories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to add memory');
      await get().fetchMemories();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addDataPoint: async (memoryId: string, type: DataType, name: string, content: string) => {
    try {
      const response = await fetch(`${API_URL}/memories/${memoryId}/data-points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, content }),
      });
      if (!response.ok) throw new Error('Failed to add data point');
      await get().fetchMemories();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateDataPointStatus: async (memoryId: string, dataPointId: string, status: 'processing' | 'ready') => {
    // This might need a specific endpoint if we want real persistence for status updates
    // For now we'll just refetch if we assume the backend handles it or mock a PATCH
    try {
       // Assuming a generic data-point patch might exist or just refetching
       await get().fetchMemories();
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));

