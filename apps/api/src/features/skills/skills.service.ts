import { Injectable } from '@nestjs/common';
import { SkillsRepository } from './skills.repository';
import { skills } from './skills.schema';

const DEFAULT_MARKETPLACE = [
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

const DEFAULT_MY_SKILLS = [
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

@Injectable()
export class SkillsService {
  constructor(private readonly repository: SkillsRepository) {}

  async create(data: typeof skills.$inferInsert) {
    return this.repository.create(data);
  }

  async findAll() {
    const dbSkills = await this.repository.findAll();
    return [...DEFAULT_MY_SKILLS, ...DEFAULT_MARKETPLACE, ...dbSkills];
  }

  async findById(id: string) {
    const mockSkill = [...DEFAULT_MY_SKILLS, ...DEFAULT_MARKETPLACE].find(s => s.id === id);
    if (mockSkill) return mockSkill;
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<typeof skills.$inferInsert>) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
