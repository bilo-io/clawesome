import { Injectable, Inject } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from '../../db/db.module';
import { workflows } from './workflows.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class WorkflowsRepository {
  constructor(@Inject(DRIZZLE) private db: NeonHttpDatabase) {}

  async findAll() {
    return this.db.select().from(workflows);
  }

  async findById(id: string) {
    const [result] = await this.db.select().from(workflows).where(eq(workflows.id, id));
    return result;
  }

  async create(data: typeof workflows.$inferInsert) {
    const [result] = await this.db.insert(workflows).values(data).returning();
    return result;
  }

  async update(id: string, data: Partial<typeof workflows.$inferInsert>) {
    const [result] = await this.db.update(workflows).set(data).where(eq(workflows.id, id)).returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await this.db.delete(workflows).where(eq(workflows.id, id)).returning();
    return result;
  }
}
