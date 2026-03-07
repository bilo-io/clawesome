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
  addMemory: (name: string) => void;
  addDataPoint: (memoryId: string, type: DataType, name: string, content: string) => void;
  updateDataPointStatus: (memoryId: string, dataPointId: string, status: 'processing' | 'ready') => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [
    {
      id: '1',
      name: 'Neural Architecture v2',
      documents: [
        { id: 'd1', type: 'pdf', name: 'Specification Doc', content: 'Neural specs...', status: 'ready', timestamp: '2h ago' },
        { id: 'd2', type: 'link', name: 'Reference Paper', content: 'https://arxiv.org/...', status: 'ready', timestamp: '3h ago' },
      ],
      lastUpdated: '2h ago'
    },
    {
      id: '2',
      name: 'Market Analysis Swarm',
      documents: [
        { id: 'd3', type: 'youtube', name: 'Competitor Review', content: 'youtube.com/...', status: 'ready', timestamp: '1d ago' },
        { id: 'd4', type: 'text', name: 'Raw Notes', content: 'Market trends...', status: 'ready', timestamp: '1d ago' },
      ],
      lastUpdated: '1d ago'
    }
  ],
  addMemory: (name: string) => set((state) => {
    const newMemory: Memory = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      documents: [],
      lastUpdated: 'just now',
    };
    return { memories: [newMemory, ...state.memories] };
  }),
  addDataPoint: (memoryId: string, type: DataType, name: string, content: string) => set((state) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newDataPoint: DataPoint = {
      id: newId,
      type,
      name,
      content,
      status: 'processing',
      timestamp: 'just now'
    };

    return {
      memories: state.memories.map((m) => {
        if (m.id === memoryId) {
          return {
            ...m,
            documents: [newDataPoint, ...m.documents].slice(0, MAX_DOCUMENTS),
            lastUpdated: 'just now'
          };
        }
        return m;
      })
    };
  }),
  updateDataPointStatus: (memoryId: string, dataPointId: string, status: 'processing' | 'ready') => set((state) => ({
    memories: state.memories.map((m) => {
      if (m.id === memoryId) {
        return {
          ...m,
          documents: m.documents.map((d) => 
            d.id === dataPointId ? { ...d, status } : d
          )
        };
      }
      return m;
    })
  }))
}));
