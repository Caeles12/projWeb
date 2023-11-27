import { Module, forwardRef } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './association.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [
    TypeOrmModule.forFeature([Association]),
    forwardRef(() => UsersModule),
    RolesModule,
  ],
  exports: [AssociationsService],
})
export class AssociationsModule {}
