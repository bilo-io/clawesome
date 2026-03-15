import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  imageUrl: text('image_url'),
  content: text('content').notNull(), // Stores the soul.md markdown
  type: varchar('type', { length: 50 }).notNull(),
  config: jsonb('config').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});