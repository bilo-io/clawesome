import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { skills } from './skills.schema';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(@Body() data: typeof skills.$inferInsert) {
    return this.skillsService.create(data);
  }

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<typeof skills.$inferInsert>) {
    return this.skillsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.delete(id);
  }
}
