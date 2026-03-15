import { Module } from '@nestjs/common';
import { SwarmsController } from './swarms.controller';
import { SwarmsService } from './swarms.service';
import { SwarmsRepository } from './swarms.repository';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SwarmsController],
  providers: [SwarmsService, SwarmsRepository],
  exports: [SwarmsService],
})
export class SwarmsModule {}
