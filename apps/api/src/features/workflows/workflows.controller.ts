import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { workflows } from './workflows.schema';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  create(@Body() data: typeof workflows.$inferInsert) {
    return this.workflowsService.create(data);
  }

  @Get()
  findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<typeof workflows.$inferInsert>) {
    return this.workflowsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.delete(id);
  }
}
