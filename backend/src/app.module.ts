import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Association } from './associations/association.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.entity';
import { MinutesModule } from './minutes/minutes.module';
import { Minute } from './minutes/minute.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'user',
      password: 'example',
      database: 'administration',
      entities: [User, Association, Role, Minute],
      synchronize: true,
    }),
    UsersModule,
    AssociationsModule,
    AuthModule,
    RolesModule,
    MinutesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ServicesService],
})
export class AppModule {}
