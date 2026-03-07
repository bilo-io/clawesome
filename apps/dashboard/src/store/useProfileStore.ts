// apps/dashboard/src/store/useProfileStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LinkedAccount {
  provider: 'google' | 'apple' | 'github';
  email: string;
  connected: boolean;
}

interface ProfileState {
  name: string;
  avatar: string; // base64 or URL
  description: string;
  clearanceLevel: string;
  linkedAccounts: LinkedAccount[];
  
  updateProfile: (updates: Partial<Omit<ProfileState, 'updateProfile' | 'linkedAccounts'>>) => void;
  toggleAccount: (provider: LinkedAccount['provider'], connected: boolean, email?: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: 'BiloDev',
      avatar: '', // Default placeholder logic in UI
      description: 'Lead AI System Architect & Swarm Orchestrator. Focused on building context-aware agentic swarms.',
      clearanceLevel: 'ROLE: S3',
      linkedAccounts: [
        { provider: 'google', email: 'bilo@google.com', connected: true },
        { provider: 'apple', email: 'bilo@apple.com', connected: false },
        { provider: 'github', email: 'bilolwabona', connected: true },
      ],

      updateProfile: (updates) => set((state) => ({ ...state, ...updates })),
      
      toggleAccount: (provider, connected, email) => set((state) => ({
        linkedAccounts: state.linkedAccounts.map(acc => 
          acc.provider === provider 
            ? { ...acc, connected, email: email ?? acc.email } 
            : acc
        )
      })),
    }),
    {
      name: 'clawesome:profile',
    }
  )
);
