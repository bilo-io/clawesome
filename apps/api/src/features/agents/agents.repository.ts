import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../db/db.module';
import { agents } from './agents.schema';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

@Injectable()
export class AgentsRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: NeonHttpDatabase,
  ) {}

  async create(data: typeof agents.$inferInsert) {
    const [result] = await this.db.insert(agents).values(data).returning();
    return result;
  }

  async findAll() {
    return await this.db.select().from(agents);
  }

  async findById(id: string) {
    const [result] = await this.db.select().from(agents).where(eq(agents.id, id));
    return result || null;
  }

  async update(id: string, data: Partial<typeof agents.$inferInsert>) {
    const [result] = await this.db
      .update(agents)
      .set(data)
      .where(eq(agents.id, id))
      .returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await this.db
      .delete(agents)
      .where(eq(agents.id, id))
      .returning();
    return result;
  }
}
