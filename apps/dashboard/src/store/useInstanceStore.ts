// apps/dashboard/src/store/useInstanceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type InstanceType = 'local' | 'server' | 'docker' | 'clawesome' | 'cloud';

export interface Instance {
  id: string;
  name: string;
  type: InstanceType;
  config: {
    storage: string;
    ram: string;
    cpu: string;
    providerId: string;
    modelId: string;
  };
  orchestrator: {
    agentId: string;
    agentName: string;
  };
  createdAt: number;
}

interface InstanceState {
  instances: Instance[];
  activeInstanceId: string;
  addInstance: (instance: Omit<Instance, 'id' | 'createdAt'>) => void;
  removeInstance: (id: string) => void;
  setActiveInstance: (id: string) => void;
}

const DEFAULT_INSTANCE: Instance = {
  id: 'local',
  name: 'Local',
  type: 'local',
  config: {
    storage: '512GB',
    ram: '16GB',
    cpu: '8 Core',
    providerId: 'google',
    modelId: 'gemini-1.5-pro',
  },
  orchestrator: {
    agentId: 'core-1',
    agentName: 'Clawesome Prime',
  },
  createdAt: Date.now(),
};

export const useInstanceStore = create<InstanceState>()(
  persist(
    (set) => ({
      instances: [DEFAULT_INSTANCE],
      activeInstanceId: 'local',
      addInstance: (data) => {
        const newInstance: Instance = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        set((state) => ({ 
          instances: [...state.instances, newInstance],
          activeInstanceId: newInstance.id 
        }));
      },
      removeInstance: (id) => {
        if (id === 'local') return; // Cannot remove local
        set((state) => {
          const newInstances = state.instances.filter((inst) => inst.id !== id);
          const nextActiveId = state.activeInstanceId === id ? 'local' : state.activeInstanceId;
          return {
            instances: newInstances,
            activeInstanceId: nextActiveId,
          };
        });
      },
      setActiveInstance: (id) => set({ activeInstanceId: id }),
    }),
    {
      name: 'clawesome:instances',
      partialize: (state) => ({ 
        instances: state.instances,
        activeInstanceId: state.activeInstanceId,
      }),
    }
  )
);
