import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { agents } from './agents.schema';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: typeof agents.$inferInsert) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: Partial<typeof agents.$inferInsert>) {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.delete(id);
  }
}
