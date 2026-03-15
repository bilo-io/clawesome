import { Injectable, Inject } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from '../../db/db.module';
import { memories, dataPoints } from './memories.schema';
import { eq } from 'drizzle-orm';
import { schema } from '../../db/schema';

@Injectable()
export class MemoriesRepository {
  constructor(@Inject(DRIZZLE) private db: NeonHttpDatabase<typeof schema>) {}

  async findAll() {
    return this.db.query.memories.findMany({
      with: {
        documents: true,
      },
    });
  }

  async findById(id: string) {
    return this.db.query.memories.findFirst({
      where: eq(memories.id, id),
      with: {
        documents: true,
      },
    });
  }

  async createMemory(data: typeof memories.$inferInsert) {
    const [result] = await this.db.insert(memories).values(data).returning();
    return result;
  }

  async addDataPoint(data: typeof dataPoints.$inferInsert) {
    const [result] = await this.db.insert(dataPoints).values(data).returning();
    return result;
  }
}
