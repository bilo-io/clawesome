import { Injectable } from '@nestjs/common';
import { SwarmsRepository } from './swarms.repository';
import { swarms } from './swarms.schema';

const MOCK_SWARMS = [
  { 
    id: '1', 
    icon: 'Briefcase', 
    name: 'clawesome Core', 
    path: '~/BiloDev/clawesome', 
    status: 'Active', 
    color: 'indigo',
    agents: [
      { id: 'a1', color: 'bg-[#8C00FF]' },
      { id: 'a2', color: 'bg-[#008FD6]' },
      { id: 'a3', color: 'bg-emerald-500' }
    ]
  },
  { 
    id: '2', 
    icon: 'Globe', 
    name: 'Cloud Infra', 
    path: '~/cloud-configs', 
    status: 'Idle', 
    color: 'emerald',
    agents: [
      { id: 'a4', color: 'bg-emerald-400' },
      { id: 'a5', color: 'bg-indigo-400' }
    ]
  },
  { 
    id: '3', 
    icon: 'User', 
    name: 'Personal Lab', 
    path: '~/playground', 
    status: 'Idle', 
    color: 'amber',
    agents: [
      { id: 'a6', color: 'bg-amber-400' }
    ]
  },
  { 
    id: '4', 
    icon: 'GraduationCap', 
    name: 'Training AI', 
    path: '~/datasets/v1', 
    status: 'In Progress', 
    color: 'rose',
    agents: [
      { id: 'a7', color: 'bg-rose-400' },
      { id: 'a8', color: 'bg-slate-400' },
      { id: 'a9', color: 'bg-indigo-400' },
      { id: 'a10', color: 'bg-emerald-400' }
    ]
  },
  { 
    id: '5', 
    icon: 'Zap', 
    name: 'Protocol X', 
    path: '~/protocols/x', 
    status: 'Active', 
    color: 'indigo',
    agents: [
      { id: 'a11', color: 'bg-[#8C00FF]' },
      { id: 'a12', color: 'bg-amber-500' }
    ]
  },
];

@Injectable()
export class SwarmsService {
  constructor(private readonly repository: SwarmsRepository) {}

  async findAll() {
    const dbSwarms = await this.repository.findAll();
    return [...MOCK_SWARMS, ...dbSwarms];
  }

  async findById(id: string) {
    const mockSwarm = MOCK_SWARMS.find(s => s.id === id);
    if (mockSwarm) return mockSwarm;
    return this.repository.findById(id);
  }

  async create(data: typeof swarms.$inferInsert) {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<typeof swarms.$inferInsert>) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
