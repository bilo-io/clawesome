import { Injectable, Inject } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from '../../db/db.module';
import { skills } from './skills.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SkillsRepository {
  constructor(@Inject(DRIZZLE) private db: NeonHttpDatabase) {}

  async create(data: typeof skills.$inferInsert) {
    const [result] = await this.db.insert(skills).values(data).returning();
    return result;
  }

  async findAll() {
    return this.db.select().from(skills);
  }

  async findById(id: string) {
    const [result] = await this.db.select().from(skills).where(eq(skills.id, id));
    return result;
  }

  async update(id: string, data: Partial<typeof skills.$inferInsert>) {
    const [result] = await this.db.update(skills).set(data).where(eq(skills.id, id)).returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await this.db.delete(skills).where(eq(skills.id, id)).returning();
    return result;
  }
}
