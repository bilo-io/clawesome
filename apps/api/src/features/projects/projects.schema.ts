import { pgTable, uuid, varchar, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).default('wip').notNull(),
  progress: integer('progress').default(0).notNull(),
  taskCount: integer('task_count').default(0).notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
  agents: jsonb('agents').default([]).notNull(), // Storing as JSON for now to match frontend mock, can be relation later
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
