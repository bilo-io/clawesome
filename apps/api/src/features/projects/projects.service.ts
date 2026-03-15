import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { projects } from './projects.schema';

const MOCK_PROJECTS = [
  {
    id: 'p1',
    name: 'Neural Engine V2',
    type: 'Content Creation',
    agents: [
      { name: 'Apex-01' },
      { name: 'Core-AI' },
      { name: 'Synthetix' }
    ],
    status: 'wip',
    lastUpdated: '2h ago',
    taskCount: 12,
    progress: 65
  },
  {
    id: 'p2',
    name: 'Neo-City Chronicles',
    type: 'Game Design',
    agents: [
      { name: 'Lore-Master' },
      { name: 'World-Builder' }
    ],
    status: 'wip',
    lastUpdated: '5h ago',
    taskCount: 24,
    progress: 35
  },
  {
    id: 'p3',
    name: 'Aether Storefront',
    type: 'E-commerce',
    agents: [
      { name: 'Shop-Bot' },
      { name: 'Payment-Gate' },
      { name: 'User-Proxy' }
    ],
    status: 'Planned',
    lastUpdated: '1d ago',
    taskCount: 8,
    progress: 0
  },
  {
    id: 'p4',
    name: 'Digital Concierge',
    type: 'Personal Admin',
    agents: [
      { name: 'Alfred-AI' }
    ],
    status: 'done',
    lastUpdated: '3d ago',
    taskCount: 45,
    progress: 100
  },
  {
    id: 'p5',
    name: 'Quantum Analysis',
    type: 'Research',
    agents: [
      { name: 'Q-Prime' },
      { name: 'Data-Cruncher' },
      { name: 'Stat-Bot' }
    ],
    status: 'wip',
    lastUpdated: '15m ago',
    taskCount: 62,
    progress: 88
  }
];

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

  async findAll() {
    const dbProjects = await this.repository.findAll();
    return [...MOCK_PROJECTS, ...dbProjects];
  }

  async findById(id: string) {
    const mockProject = MOCK_PROJECTS.find(p => p.id === id);
    if (mockProject) return mockProject;
    return this.repository.findById(id);
  }

  async create(data: typeof projects.$inferInsert) {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<typeof projects.$inferInsert>) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
