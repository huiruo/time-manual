import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
// import { User } from './user.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [TypeOrmModule.forFeature([Article])],
  controllers:[ArticleController],
  providers:[ArticleService],
  exports:[ArticleService]
})
export class ArticleModule {}
