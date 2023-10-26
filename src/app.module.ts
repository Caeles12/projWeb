import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';
import { UsersModule } from './users/users.module';
import { AssociationsService } from './associations/associations.service';
import { AssociationsModule } from './associations/associations.module';

@Module({
  imports: [UsersModule, AssociationsModule],
  controllers: [AppController],
  providers: [AppService, ServicesService, AssociationsService],
})
export class AppModule {}
