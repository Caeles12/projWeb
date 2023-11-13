import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
