import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { memories, dataPoints } from './memories.schema';

@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Get()
  findAll() {
    return this.memoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesService.findById(id);
  }

  @Post()
  create(@Body() data: typeof memories.$inferInsert) {
    return this.memoriesService.create(data);
  }

  @Post(':id/data-points')
  addDataPoint(@Param('id') id: string, @Body() data: Omit<typeof dataPoints.$inferInsert, 'memoryId'>) {
    return this.memoriesService.addDataPoint({ ...data, memoryId: id });
  }
}
