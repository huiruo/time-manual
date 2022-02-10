import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentsController } from './moments.controller';
import { MomentsService } from './moments.service';
import { Moments } from './moments.entity';
// import { User } from './user.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [TypeOrmModule.forFeature([Moments])],
  controllers:[MomentsController],
  providers:[MomentsService],
  exports:[MomentsService]
})
export class MomentsModule {}
