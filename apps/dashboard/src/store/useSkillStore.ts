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
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  importSkill: (skillId: string) => void;
  updateSkill: (id: string, updates: Partial<Omit<Skill, 'id'>>) => void;
  deleteSkill: (id: string) => void;
  getSkillById: (id: string) => Skill | undefined;
}

const DEFAULT_MARKETPLACE: Skill[] = [
  {
    id: 'm1',
    name: 'Python Executor',
    icon: 'Terminal',
    description: 'Execute python snippets in a sandboxed environment.',
    content: '# Python Executor\n\nAllows the agent to run Python code to solve complex math or data processing tasks.',
    isMarketplace: true
  },
  {
    id: 'm2',
    name: 'Web Scraper',
    icon: 'Globe',
    description: 'Extract clean markdown content from any URL.',
    content: '# Web Scraper\n\nEquips the agent with the ability to fetch and parse HTML into structured markdown.',
    isMarketplace: true
  },
  {
    id: 'm3',
    name: 'Memory Vector Search',
    icon: 'Database',
    description: 'Search through long-term agent memory using embeddings.',
    content: '# Vector Search\n\nProvides semantic search capabilities over the agent\'s historical context.',
    isMarketplace: true
  },
  {
    id: 'm4',
    name: 'File System Manager',
    icon: 'FileCode',
    description: 'Read, write, and organize files in the workspace.',
    content: '# FS Manager\n\nDirect access to workspace files with safety guards.',
    isMarketplace: true
  },
  {
    id: 'm9',
    name: 'JSON Schema Validator',
    icon: 'FileJson',
    description: 'Validate and transform data against JSON schemas.',
    content: '# JSON Schema Validator\n\nValidates payloads and configs against JSON Schema with optional coercion.',
    isMarketplace: true
  },
  {
    id: 'm10',
    name: 'Shell Runner',
    icon: 'Terminal',
    description: 'Run shell commands in a controlled environment.',
    content: '# Shell Runner\n\nExecute shell commands with timeout and output capture.',
    isMarketplace: true
  },
  {
    id: 'm11',
    name: 'Image Analyzer',
    icon: 'Scan',
    description: 'Analyze images for content, OCR, and structure.',
    content: '# Image Analyzer\n\nExtract text and metadata from images using vision capabilities.',
    isMarketplace: true
  },
  {
    id: 'm12',
    name: 'Code Search',
    icon: 'Search',
    description: 'Semantic and literal search across codebase.',
    content: '# Code Search\n\nFind definitions, usages, and patterns in the workspace.',
    isMarketplace: true
  },
  {
    id: 'm13',
    name: 'HTTP Client',
    icon: 'Network',
    description: 'Make HTTP requests and parse responses.',
    content: '# HTTP Client\n\nFetch APIs and web resources with headers and body support.',
    isMarketplace: true
  },
  {
    id: 'm14',
    name: 'Markdown Parser',
    icon: 'FileText',
    description: 'Parse and transform markdown documents.',
    content: '# Markdown Parser\n\nParse markdown to AST and render to HTML or plain text.',
    isMarketplace: true
  },
  {
    id: 'm15',
    name: 'Regex Tool',
    icon: 'Code2',
    description: 'Match, extract, and replace using regular expressions.',
    content: '# Regex Tool\n\nTest and apply regex patterns with capture groups.',
    isMarketplace: true
  },
];

const DEFAULT_MY_SKILLS: Skill[] = [
  {
    id: 'installed-1',
    name: 'File System Manager',
    icon: 'FileCode',
    description: 'Read, write, and organize files in the workspace.',
    content: '# FS Manager\n\nDirect access to workspace files with safety guards.',
    isMarketplace: false
  },
  {
    id: 'installed-2',
    name: 'Memory Vector Search',
    icon: 'Database',
    description: 'Search through long-term agent memory using embeddings.',
    content: '# Vector Search\n\nProvides semantic search capabilities over the agent\'s historical context.',
    isMarketplace: false
  },
  {
    id: 'installed-3',
    name: 'Web Scraper',
    icon: 'Globe',
    description: 'Extract clean markdown content from any URL.',
    content: '# Web Scraper\n\nEquips the agent with the ability to fetch and parse HTML into structured markdown.',
    isMarketplace: false
  },
];

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      mySkills: DEFAULT_MY_SKILLS,
      marketplaceSkills: DEFAULT_MARKETPLACE,
      addSkill: (skillData) => {
        const newSkill: Skill = {
          ...skillData,
          id: crypto.randomUUID(),
        };
        set((state) => ({ mySkills: [newSkill, ...state.mySkills] }));
      },
      importSkill: (skillId) => {
        const skill = get().marketplaceSkills.find(s => s.id === skillId);
        if (skill && !get().mySkills.some(s => s.name === skill.name)) {
          const newSkill = { ...skill, id: crypto.randomUUID(), isMarketplace: false };
          set((state) => ({ mySkills: [newSkill, ...state.mySkills] }));
        }
      },
      updateSkill: (id, updates) => {
        set((state) => ({
          mySkills: state.mySkills.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
      },
      deleteSkill: (id) => {
        set((state) => ({
          mySkills: state.mySkills.filter((s) => s.id !== id),
        }));
      },
      getSkillById: (id) => {
        return get().mySkills.find((s) => s.id === id) || get().marketplaceSkills.find((s) => s.id === id);
      },
    }),
    {
      name: 'skill-storage',
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as { mySkills?: Skill[]; marketplaceSkills?: Skill[]; [k: string]: unknown };
        if (Array.isArray(p.mySkills) && p.mySkills.length === 0)
          return { ...current, ...p, mySkills: DEFAULT_MY_SKILLS };
        return { ...current, ...p };
      },
    }
  )
);
