import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  type: string;
  agents: { name: string; avatar?: string }[];
  status: 'wip' | 'Planned' | 'done';
  lastUpdated: string;
  taskCount: number;
  progress: number;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchProjects: async () => {
    const { isLoading, lastFetched } = get();
    const now = Date.now();
    if (isLoading || (lastFetched && now - lastFetched < 2000)) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      set({ projects: data, isLoading: false, lastFetched: Date.now() });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProject: async (projectData) => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error('Failed to add project');
      await get().fetchProjects();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      await get().fetchProjects();
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
