import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';
import { UsersModule } from './users/users.module';
import { AssociationsService } from './associations/associations.service';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Association } from './associations/association.entity';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [User, Association],
      synchronize: true,
    }),
    UsersModule,
    AssociationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ServicesService],
})
export class AppModule {}
