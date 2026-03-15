import { pgTable, uuid, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const workflows = pgTable('workflows', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  lastRun: timestamp('last_run'),
  nodes: jsonb('nodes').default([]).notNull(),
  edges: jsonb('edges').default([]).notNull(),
  isMarketplace: boolean('is_marketplace').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
