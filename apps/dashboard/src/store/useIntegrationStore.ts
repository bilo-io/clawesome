import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IntegrationStatus = 'pending' | 'active' | 'inactive';

export interface Integration {
  id: string;
  name: string;
  icon: string;
  orgId?: string;
  description: string;
  status: IntegrationStatus;
  isMarketplace?: boolean;
}

interface IntegrationState {
  myIntegrations: Integration[];
  marketplaceIntegrations: Integration[];
  addIntegration: (id: string) => void;
  removeIntegration: (id: string) => void;
  updateIntegration: (id: string, updates: Partial<Pick<Integration, 'status'>>) => void;
  setConfigured: (id: string, active: boolean) => void;
  isInstalled: (integrationName: string) => boolean;
}

const MARKETPLACE_INTEGRATIONS: Omit<Integration, 'status'>[] = [
  { id: 'slack', name: 'Slack', icon: 'MessageSquare', orgId: 'slack', description: 'Send and receive messages, manage channels.', isMarketplace: true },
  { id: 'discord', name: 'Discord', icon: 'MessageCircle', orgId: 'discord', description: 'Send and receive messages on Discord.', isMarketplace: true },
  { id: 'telegram', name: 'Telegram', icon: 'Send', orgId: 'telegram', description: 'Send and receive messages on Telegram.', isMarketplace: true },
  { id: 'github', name: 'GitHub', icon: 'Github', orgId: 'github', description: 'Repos, issues, PRs, and workflows.', isMarketplace: true },
  { id: 'linear', name: 'Linear', icon: 'LayoutList', description: 'Issues, cycles, and project tracking.', isMarketplace: true },
  { id: 'notion', name: 'Notion', icon: 'FileText', orgId: 'notion', description: 'Pages, databases, and wikis.', isMarketplace: true },
];

const marketplaceWithStatus: Integration[] = MARKETPLACE_INTEGRATIONS.map((i) => ({ ...i, status: 'inactive' as const }));

export const useIntegrationStore = create<IntegrationState>()(
  persist(
    (set, get) => ({
      myIntegrations: [
        { id: 'discord-default', name: 'Discord', icon: 'MessageCircle', orgId: 'discord', description: 'Send and receive messages on Discord.', status: 'active', isMarketplace: false },
        { id: 'github-default', name: 'GitHub', icon: 'Github', orgId: 'github', description: 'Repos, issues, PRs, and workflows.', status: 'active', isMarketplace: false },
      ],
      marketplaceIntegrations: marketplaceWithStatus,
      addIntegration: (id) => {
        const entry = get().marketplaceIntegrations.find((i) => i.id === id);
        if (!entry || get().myIntegrations.some((i) => i.name === entry.name)) return;
        const newIntegration: Integration = {
          id: `${entry.id}-${crypto.randomUUID().slice(0, 8)}`,
          name: entry.name,
          icon: entry.icon,
          description: entry.description,
          status: 'pending',
          isMarketplace: false,
        };
        set((state) => ({ myIntegrations: [newIntegration, ...state.myIntegrations] }));
      },
      removeIntegration: (id) => {
        set((state) => ({
          myIntegrations: state.myIntegrations.filter((i) => i.id !== id),
        }));
      },
      updateIntegration: (id, updates) => {
        set((state) => ({
          myIntegrations: state.myIntegrations.map((i) =>
            i.id === id ? { ...i, ...updates } : i
          ),
        }));
      },
      setConfigured: (id, active) => {
        set((state) => ({
          myIntegrations: state.myIntegrations.map((i) =>
            i.id === id ? { ...i, status: active ? 'active' : 'inactive' } : i
          ),
        }));
      },
      isInstalled: (name) => get().myIntegrations.some((i) => i.name === name),
    }),
    {
      name: 'integration-storage',
      partialize: (state) => ({ myIntegrations: state.myIntegrations }),
    }
  )
);
