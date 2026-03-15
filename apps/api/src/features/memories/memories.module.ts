import { Module } from '@nestjs/common';
import { MemoriesController } from './memories.controller';
import { MemoriesService } from './memories.service';
import { MemoriesRepository } from './memories.repository';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [MemoriesController],
  providers: [MemoriesService, MemoriesRepository],
  exports: [MemoriesService],
})
export class MemoriesModule {}
