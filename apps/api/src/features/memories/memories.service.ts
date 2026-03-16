import { Injectable } from '@nestjs/common';
import { MemoriesRepository } from './memories.repository';
import { memories, dataPoints } from './memories.schema';

const MOCK_MEMORIES = [
  {
    id: '1',
    name: 'Neural Architecture v2',
    documents: [
      { id: 'd1', type: 'pdf', name: 'Specification Doc', content: 'Neural specs...', status: 'ready', timestamp: '2h ago' },
      { id: 'd2', type: 'link', name: 'Reference Paper', content: 'https://arxiv.org/...', status: 'ready', timestamp: '3h ago' },
    ],
    lastUpdated: '2h ago'
  },
  {
    id: '2',
    name: 'Market Analysis Swarm',
    documents: [
      { id: 'd3', type: 'youtube', name: 'Competitor Review', content: 'youtube.com/...', status: 'ready', timestamp: '1d ago' },
      { id: 'd4', type: 'text', name: 'Raw Notes', content: 'Market trends...', status: 'ready', timestamp: '1d ago' },
    ],
    lastUpdated: '1d ago'
  }
];

@Injectable()
export class MemoriesService {
  constructor(private readonly repository: MemoriesRepository) {}

  async findAll() {
    try {
      const dbMemories = await this.repository.findAll();
      return [...MOCK_MEMORIES, ...dbMemories];
    } catch (error) {
      console.error('Failed to fetch memories from DB, returning mocks only:', error.message);
      return MOCK_MEMORIES;
    }
  }

  async findById(id: string) {
    const mockMemory = MOCK_MEMORIES.find(m => m.id === id);
    if (mockMemory) return mockMemory;
    try {
      return await this.repository.findById(id);
    } catch (error) {
      console.error(`Failed to fetch memory ${id} from DB:`, error.message);
      return null;
    }
  }

  async create(data: typeof memories.$inferInsert) {
    return this.repository.createMemory(data);
  }

  async addDataPoint(data: typeof dataPoints.$inferInsert) {
    return this.repository.addDataPoint(data);
  }
}
