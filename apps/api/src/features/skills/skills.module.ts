import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { SkillsRepository } from './skills.repository';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SkillsController],
  providers: [SkillsService, SkillsRepository],
  exports: [SkillsService],
})
export class SkillsModule {}
