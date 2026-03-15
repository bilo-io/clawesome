import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/features/**/*.schema.ts', // Vertical slice pattern
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL_UNPOOLED!, // Direct connection for migrations
    },
});