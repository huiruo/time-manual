import { Controller,Inject,Param,Get } from '@nestjs/common';
import { Result } from '../common/result.interface';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
      @Inject(ArticleService) private readonly ArticleService: ArticleService,
  ) {} 

  // http://localhost:3800/article/20
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
      console.log('findone---->')
      const data = await this.ArticleService.findOne(id);
      return { code: 200, message: '查询成功', data };
  }
}
