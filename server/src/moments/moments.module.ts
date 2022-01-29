import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentsController } from './moments.controller';
import { MomentsService } from './moments.service';
import { User } from './moments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers:[MomentsController],
  providers:[MomentsService],
  exports:[MomentsService]
})
export class MomentsModule {}
