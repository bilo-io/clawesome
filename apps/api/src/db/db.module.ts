import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { ConfigService } from '@nestjs/config';
import { schema } from './schema';

export const DRIZZLE = 'DRIZZLE_CLIENT';

@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const url = configService.get<string>('DATABASE_URL');
                const sql = neon(url!);
                return drizzle(sql, { schema });
            },
        },
    ],
    exports: [DRIZZLE],
})
export class DbModule { }