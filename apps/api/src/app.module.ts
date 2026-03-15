import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AgentsModule } from './features/agents/agents.module';
import { SkillsModule } from './features/skills/skills.module';
import { MemoriesModule } from './features/memories/memories.module';
import { ProjectsModule } from './features/projects/projects.module';
import { WorkflowsModule } from './features/workflows/workflows.module';
import { SwarmsModule } from './features/swarms/swarms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    AgentsModule,
    SkillsModule,
    MemoriesModule,
    ProjectsModule,
    WorkflowsModule,
    SwarmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
