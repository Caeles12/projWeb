import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Minute } from './minute.entity';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';
import { AssociationsModule } from 'src/associations/associations.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [MinutesController],
  imports: [
    TypeOrmModule.forFeature([Minute]),
    forwardRef(() => AssociationsModule),
    forwardRef(() => UsersModule),
  ],
  providers: [MinutesService],
  exports: [MinutesService],
})
export class MinutesModule {}
