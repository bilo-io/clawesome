import { Injectable } from '@nestjs/common';
import { AgentsRepository } from './agents.repository';
import { agents } from './agents.schema';

const MOCK_AGENTS = [
  {
    id: 'a1',
    name: 'Apex-01',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Apex-01',
    content: 'Primary orchestration agent for mission-critical protocols.',
    type: 'orchestrator',
    config: {},
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'a2',
    name: 'Core-AI',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Core-AI',
    content: 'System-level intelligence and resource management.',
    type: 'system',
    config: {},
    createdAt: new Date('2024-01-02T00:00:00Z'),
  },
  {
    id: 'a3',
    name: 'Synthetix',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Synthetix',
    content: 'Data synthesis and pattern recognition specialist.',
    type: 'research',
    config: {},
    createdAt: new Date('2024-01-03T00:00:00Z'),
  },
];

@Injectable()
export class AgentsService {
  constructor(private readonly repository: AgentsRepository) {}

  async create(data: typeof agents.$inferInsert) {
    return this.repository.create(data);
  }

  async findAll() {
    const dbAgents = await this.repository.findAll();
    return [...MOCK_AGENTS, ...dbAgents];
  }

  async findById(id: string) {
    const mockAgent = MOCK_AGENTS.find(a => a.id === id);
    if (mockAgent) return mockAgent;
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<typeof agents.$inferInsert>) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
