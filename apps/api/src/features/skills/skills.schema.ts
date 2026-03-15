import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  icon: varchar('icon', { length: 100 }).notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  isMarketplace: boolean('is_marketplace').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
