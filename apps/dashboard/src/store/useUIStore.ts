// apps/dashboard/src/store/useUIStore.ts
import { create } from 'zustand';

interface UIState {
  isSidebarExpanded: boolean;
  glowIntensity: number;
  isFocusMode: boolean;
  activeWorkspaceId: string;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setGlowIntensity: (intensity: number) => void;
  toggleFocusMode: () => void;
  setActiveWorkspace: (id: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarExpanded: true,
  glowIntensity: 50,
  isFocusMode: false,
  activeWorkspaceId: 'default',
  theme: 'dark',
  toggleSidebar: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
  setGlowIntensity: (intensity) => set({ glowIntensity: intensity }),
  toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),
  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
  setTheme: (theme) => set({ theme }),
}));
