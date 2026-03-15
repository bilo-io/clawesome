import { Injectable } from '@nestjs/common';
import { AgentsRepository } from './agents.repository';
import { agents } from './agents.schema';

@Injectable()
export class AgentsService {
  constructor(private readonly repository: AgentsRepository) {}

  async create(data: typeof agents.$inferInsert) {
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<typeof agents.$inferInsert>) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
