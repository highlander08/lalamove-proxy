import { Module } from '@nestjs/common';
import { LalamoveService } from './lalamove.service';
import { LalamoveController } from './lalamove.controller';

@Module({
  controllers: [LalamoveController],
  providers: [LalamoveService],
})
export class LalamoveModule {}
