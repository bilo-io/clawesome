import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const swarms = pgTable('swarms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  path: text('path').notNull(),
  status: varchar('status', { length: 50 }).default('Active').notNull(),
  color: varchar('color', { length: 50 }).default('indigo').notNull(),
  icon: varchar('icon', { length: 100 }).notNull(), // Icon name
  agents: jsonb('agents').default([]).notNull(), // List of agent objects or IDs
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
