import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LalamoveModule } from './lalamove/lalamove.module';
import { LalamoveController } from './lalamove/lalamove.controller';

@Module({
  imports: [LalamoveModule],
  controllers: [AppController, LalamoveController],
  providers: [AppService],
})
export class AppModule {}
