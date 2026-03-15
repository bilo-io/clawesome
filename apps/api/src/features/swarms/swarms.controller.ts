import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwarmsService } from './swarms.service';
import { swarms } from './swarms.schema';

@Controller('swarms')
export class SwarmsController {
  constructor(private readonly swarmsService: SwarmsService) {}

  @Post()
  create(@Body() data: typeof swarms.$inferInsert) {
    return this.swarmsService.create(data);
  }

  @Get()
  findAll() {
    return this.swarmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.swarmsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<typeof swarms.$inferInsert>) {
    return this.swarmsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swarmsService.delete(id);
  }
}
