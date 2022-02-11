import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  public async addArticle(article: Article) {

    const { content, tag } = article;

    const row = {
      content: content,
      tag: tag,
    };

    console.log('add article row', row);

    try {

      const result = await this.articleRepo.save(row);

      return { code: 200, msg: '添加成功', data: null };

    } catch (error) {

      return { code: 500, msg: error.sqlMessage, data: null };

    }
  }

  public async editArticle(article: Article) {

    const { content, tag ,id } = article;

    const row = {
      content: content,
      tag: tag,
    };

    console.log('add article row', row);

    try {

      const result = await this.articleRepo.update(id,row);

      console.log('编辑 result:',result);

      return { code: 200, msg: '编辑成功', data: null };

    } catch (error) {

      return { code: 500, msg: error.sqlMessage, data: null };

    }
  }

  public async queryArticles(currentPage: number, pageSize: number) {
    let totalCount = 0;

    try {
      const sql = 'SELECT COUNT(*) as totalCount FROM article;';
      const result = await this.articleRepo.query(sql);
      totalCount = parseInt(result[0].totalCount);
    } catch (error) {
      console.log('query total error:', error);
    }

    try {
      const sql = `select * from article order by created_time desc limit ${
        (currentPage - 1) * pageSize
      },${pageSize}`;
      const result = await this.articleRepo.query(sql);
      const data = {
        totalCount,
        currentPage,
        pageSize,
        result,
      };
      return { code: 200, msg: '查询成功', data };
    } catch (error) {
      return { code: 500, msg: error.sqlMessage, data: null };
    }
  }

  public async deleteArticle(id:number|string){

    try {

      const sql:string = `delete from article where id = ${id}` 

      const result = await this.articleRepo.query(sql);

      return { code: 200, msg: '查询成功', data:null };

    } catch (error) {

      return { code: 500, msg: error.sqlMessage, data: null };

    }

  }

  public async queryArticleById(id:number|string){

    try {

      const sql:string = `select * from article where id = ${id}` 

      const result = await this.articleRepo.query(sql);

      if(result.length>=1){

        return { code: 200, msg: '查询成功', data:result[0] };

      }else{

        return { code: 500, msg: 'id不存在', data: [] };

      }

    } catch (error) {

      return { code: 500, msg: error.sqlMessage, data: null };

    }

  }

}
