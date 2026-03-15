import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const memories = pgTable('memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const dataPoints = pgTable('data_points', {
  id: uuid('id').primaryKey().defaultRandom(),
  memoryId: uuid('memory_id').references(() => memories.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // link, youtube, pdf, text
  name: varchar('name', { length: 255 }).notNull(),
  content: text('content').notNull(),
  status: varchar('status', { length: 50 }).default('ready').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export const memoriesRelations = relations(memories, ({ many }) => ({
  documents: many(dataPoints),
}));

export const dataPointsRelations = relations(dataPoints, ({ one }) => ({
  memory: one(memories, {
    fields: [dataPoints.memoryId],
    references: [memories.id],
  }),
}));
