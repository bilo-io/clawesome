import { Module } from '@nestjs/common';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';
import { WorkflowsRepository } from './workflows.repository';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowsRepository],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
