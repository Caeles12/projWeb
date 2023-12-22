import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => UsersModule)],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
