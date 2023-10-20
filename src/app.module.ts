import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ServicesService],
})
export class AppModule {}
