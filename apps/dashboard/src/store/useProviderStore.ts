import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProviderOption {
  id: string;
  name: string;
  models: { id: string; label: string }[];
}

export interface ProviderState {
  providerId: string;
  name: string;
  preferredModel: string;
  apiKeySet: boolean;
}

interface ProviderStoreState {
  providers: ProviderState[];
  apiKeys: Record<string, string>; // in-memory only, not persisted
  setPreferredModel: (providerId: string, modelId: string) => void;
  setApiKey: (providerId: string, key: string) => void;
  getApiKey: (providerId: string) => string;
  addProvider: (providerId: string, name: string, defaultModelId: string) => void;
  removeProvider: (providerId: string) => void;
}

const BUILTIN_PROVIDERS: ProviderOption[] = [
  { id: 'openai', name: 'OpenAI', models: [{ id: 'gpt-4o', label: 'GPT-4o' }, { id: 'gpt-4o-mini', label: 'GPT-4o Mini' }, { id: 'o1', label: 'o1' }] },
  { id: 'anthropic', name: 'Anthropic', models: [{ id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' }, { id: 'claude-3-opus', label: 'Claude 3 Opus' }, { id: 'claude-3-haiku', label: 'Claude 3 Haiku' }] },
  { id: 'google', name: 'Google', models: [{ id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' }, { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' }] },
  { id: 'openrouter', name: 'OpenRouter', models: [{ id: 'default', label: 'Default' }, { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' }] },
];

const getDefaultProviders = (): ProviderState[] =>
  BUILTIN_PROVIDERS.map((p) => ({
    providerId: p.id,
    name: p.name,
    preferredModel: p.models[0]?.id ?? '',
    apiKeySet: false,
  }));

export const useProviderStore = create<ProviderStoreState>()(
  persist(
    (set, get) => ({
      providers: getDefaultProviders(),
      apiKeys: {},
      setPreferredModel: (providerId, modelId) => {
        set((state) => ({
          providers: state.providers.map((p) =>
            p.providerId === providerId ? { ...p, preferredModel: modelId } : p
          ),
        }));
      },
      setApiKey: (providerId, key) => {
        set((state) => ({
          providers: state.providers.map((p) =>
            p.providerId === providerId ? { ...p, apiKeySet: key.length > 0 } : p
          ),
        }));
        set((state) => ({ apiKeys: { ...state.apiKeys, [providerId]: key } }));
      },
      getApiKey: (providerId) => get().apiKeys[providerId] ?? '',
      addProvider: (providerId, name, defaultModelId) => {
        if (get().providers.some((p) => p.providerId === providerId)) return;
        set((state) => ({
          providers: [...state.providers, { providerId, name, preferredModel: defaultModelId, apiKeySet: false }],
        }));
      },
      removeProvider: (providerId) => {
        set((state) => ({
          providers: state.providers.filter((p) => p.providerId !== providerId),
        }));
        const { [providerId]: _, ...rest } = get().apiKeys;
        set({ apiKeys: rest });
      },
    }),
    {
      name: 'provider-storage',
      partialize: (state) => ({ providers: state.providers }),
    }
  )
);

export { BUILTIN_PROVIDERS };
