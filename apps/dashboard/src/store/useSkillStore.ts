// apps/dashboard/src/store/useSkillStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Skill {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  description: string;
  content: string; // Markdown
  isMarketplace?: boolean;
}

interface SkillState {
  mySkills: Skill[];
  marketplaceSkills: Skill[];
  isLoading: boolean;
  error: string | null;
  fetchSkills: () => Promise<void>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  importSkill: (skillId: string) => Promise<void>;
  updateSkill: (id: string, updates: Partial<Omit<Skill, 'id'>>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  getSkillById: (id: string) => Skill | undefined;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const useSkillStore = create<SkillState>((set, get) => ({
  mySkills: [],
  marketplaceSkills: [],
  isLoading: false,
  error: null,

  fetchSkills: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/skills`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      const data = await response.json();
      
      const mySkills = data.filter((s: any) => !s.isMarketplace);
      const marketplaceSkills = data.filter((s: any) => s.isMarketplace);
      
      set({ mySkills, marketplaceSkills, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSkill: async (skillData) => {
    try {
      const response = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      if (!response.ok) throw new Error('Failed to add skill');
      await get().fetchSkills();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  importSkill: async (skillId) => {
    // Basic import logic: just a POst to create a new one based on marketplace
    const skill = get().marketplaceSkills.find(s => s.id === skillId);
    if (skill) {
      await get().addSkill({ ...skill, isMarketplace: false });
    }
  },

  updateSkill: async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/skills/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update skill');
      await get().fetchSkills();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteSkill: async (id) => {
    try {
      const response = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete skill');
      await get().fetchSkills();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  getSkillById: (id) => {
    return get().mySkills.find((s) => s.id === id) || get().marketplaceSkills.find((s) => s.id === id);
  },
}));

