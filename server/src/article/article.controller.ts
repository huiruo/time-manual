import { Controller, Inject, Body, Param, Get, Post } from '@nestjs/common';
import { Result } from '../common/result.interface';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(
    @Inject(ArticleService) private readonly articleService: ArticleService,
  ) {}

  @Post('add')
  async addArticle(@Body() body: Article) {
    console.log('add article', body);
    const data = await this.articleService.addArticle(body);
    return data;
  }

  @Post('edit')
  async editArticle(@Body() body: Article) {
    console.log('edit article', body);
    const data = await this.articleService.editArticle(body);
    return data;
  }

  @Post('query')
  async queryArticles(@Body() body) {
    const currentPage: number = body.currentPage;
    const pageSize: number = body.pageSize;
    const data = await this.articleService.queryArticles(currentPage, pageSize);
    return data;
  }

  @Post('query/id')
  async queryArticleById(@Body() body) {
    const id:string = body.id
    const data = await this.articleService.queryArticleById(id);
    return data;
  }

  @Post('delete')
  async deleteArticle(@Body() body){
    const id:string = body.id

    const data = await this.articleService.deleteArticle(id);

    return data;

  }
}
