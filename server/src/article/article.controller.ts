import { Controller, Inject, Body, Param, Get, Post } from '@nestjs/common';
import { Result } from '../common/result.interface';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(
    @Inject(ArticleService) private readonly articleService: ArticleService,
  ) {}

  // http://localhost:3800/article/20
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
    console.log('findone---->');
    const data = await this.articleService.findOne(id);
    return { code: 200, message: '查询成功', data };
  }

  @Post('add')
  async addMomonts(@Body() body: Article) {
    console.log('add article', body);
    const data = await this.articleService.addArticle(body);
    return data;
  }

  @Post('query')
  async queryArticles(@Body() body) {
    console.log('queryArticles', body);
    const currentPage: number = body.currentPage;
    const pageSize: number = body.pageSize;
    const data = await this.articleService.queryArticles(currentPage, pageSize);
    return data;
  }
}
