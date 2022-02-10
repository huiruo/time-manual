import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
// import { User } from './user.entity';

@Injectable()
export class ArticleService {
  constructor(
    // @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  async findOne(id: string) {
    /*
      let sql = `select * from user where id = ${id}`;
      console.log('findOne',sql)
      let list = await this.userRepo.query(sql);
      console.log('list',list)
      return list
    */
  }

  public async findOneArticleById(id: string): Promise<Article> {
    console.log('根据ID查询单个信息:', id);
    console.log('process.env', process.env.DATABASE_USER);
    const userInfo = await this.articleRepo.findOne(id);
    if (!userInfo) {
      throw new HttpException(`指定 id=${id} 数据不存在`, 404);
    }
    return userInfo;
  }

  public async addArticle(article: Article) {
    const { content, tag } = article;

    const row = {
      content: content,
      tag: tag,
    };

    console.log('add article row', row);

    try {
      const result = await this.articleRepo.save(row);
      // console.log("add return",result)
      return { code: 200, msg: '查询成功', data: null };
    } catch (error) {
      console.log('add article sql error:', error);
      // console.log("sql error:====>",error.sqlMessage)
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
}
