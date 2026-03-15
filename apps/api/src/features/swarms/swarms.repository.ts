import { Injectable, Inject } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from '../../db/db.module';
import { swarms } from './swarms.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SwarmsRepository {
  constructor(@Inject(DRIZZLE) private db: NeonHttpDatabase) {}

  async findAll() {
    return this.db.select().from(swarms);
  }

  async findById(id: string) {
    const [result] = await this.db.select().from(swarms).where(eq(swarms.id, id));
    return result;
  }

  async create(data: typeof swarms.$inferInsert) {
    const [result] = await this.db.insert(swarms).values(data).returning();
    return result;
  }

  async update(id: string, data: Partial<typeof swarms.$inferInsert>) {
    const [result] = await this.db.update(swarms).set(data).where(eq(swarms.id, id)).returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await this.db.delete(swarms).where(eq(swarms.id, id)).returning();
    return result;
  }
}
