import { Injectable, Inject } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from '../../db/db.module';
import { projects } from './projects.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProjectsRepository {
  constructor(@Inject(DRIZZLE) private db: NeonHttpDatabase) {}

  async findAll() {
    return this.db.select().from(projects);
  }

  async findById(id: string) {
    const [result] = await this.db.select().from(projects).where(eq(projects.id, id));
    return result;
  }

  async create(data: typeof projects.$inferInsert) {
    const [result] = await this.db.insert(projects).values(data).returning();
    return result;
  }

  async update(id: string, data: Partial<typeof projects.$inferInsert>) {
    const [result] = await this.db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await this.db.delete(projects).where(eq(projects.id, id)).returning();
    return result;
  }
}
