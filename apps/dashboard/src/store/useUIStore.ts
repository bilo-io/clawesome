// apps/dashboard/src/store/useUIStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ViewMode = 'grid' | 'list' | 'table';
export type ThemePreference = 'light' | 'dark' | 'system';

interface UIState {
  isSidebarExpanded: boolean;
  glowIntensity: number;
  isFocusMode: boolean;
  activeWorkspaceId: string;
  themePreference: ThemePreference;
  theme: 'light' | 'dark';
  /** Per-route view mode map, keyed by pathname e.g. '/agents' */
  viewModes: Record<string, ViewMode>;
  isMobileSidebarOpen: boolean;
  isInstanceWizardOpen: boolean;

  toggleSidebar: () => void;
  toggleMobileSidebar: (open?: boolean) => void;
  setGlowIntensity: (intensity: number) => void;
  toggleFocusMode: () => void;
  setActiveWorkspace: (id: string) => void;
  setThemePreference: (pref: ThemePreference) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setViewMode: (route: string, mode: ViewMode) => void;
  getViewMode: (route: string, defaultMode?: ViewMode) => ViewMode;
  setInstanceWizardOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      isSidebarExpanded: true,
      glowIntensity: 50,
      isFocusMode: false,
      activeWorkspaceId: 'default',
      themePreference: 'system',
      theme: 'dark',
      viewModes: {},
      isMobileSidebarOpen: false,
      isInstanceWizardOpen: false,

      toggleSidebar: () =>
        set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
      toggleMobileSidebar: (open) => 
        set((state) => ({ isMobileSidebarOpen: open !== undefined ? open : !state.isMobileSidebarOpen })),
      setGlowIntensity: (intensity) => set({ glowIntensity: intensity }),
      toggleFocusMode: () =>
        set((state) => ({ isFocusMode: !state.isFocusMode })),
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
      setThemePreference: (pref) => set({ themePreference: pref }),
      setTheme: (theme) => set({ theme }),
      setViewMode: (route, mode) =>
        set((state) => ({
          viewModes: { ...state.viewModes, [route]: mode },
        })),
      getViewMode: (route, defaultMode = 'grid') =>
        get().viewModes[route] ?? defaultMode,
      setInstanceWizardOpen: (open: boolean) => set({ isInstanceWizardOpen: open }),
    }),
    {
      name: 'clawesome:ui',
      // Only persist the user-preference fields, not transient UI state
      partialize: (state) => ({
        themePreference: state.themePreference,
        glowIntensity: state.glowIntensity,
        viewModes: state.viewModes,
        isSidebarExpanded: state.isSidebarExpanded,
      }),
    },
  ),
);
