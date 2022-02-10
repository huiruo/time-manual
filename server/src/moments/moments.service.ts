import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moments } from './moments.entity';

@Injectable()
export class MomentsService {
  constructor(
    @InjectRepository(Moments) private readonly momentRepo: Repository<Moments>,
  ) {}

  public async findOneById(id: string): Promise<Moments> {
    console.log('根据ID查询单个信息:', id);
    console.log('process.env', process.env.DATABASE_USER);
    const userInfo = await this.momentRepo.findOne(id);
    if (!userInfo) {
      throw new HttpException(`指定 id=${id} 数据不存在`, 404);
    }
    return userInfo;
  }

  public async addMoment(moments: Moments) {
    const { content, share_url, img_url } = moments;
    const img_url_temp: string[] = img_url as any;
    const img_url_arr_str = img_url_temp.join(',');
    /*
    const sql = `insert into moments (id,content,share_url,img_url) VALUES
    ("${uuidv4()}","${content}","${share_url}","${img_url_json}")`;
    */

    // const sql = `insert into moments (id,content,share_url,img_url) VALUES
    // ("${uuidv4()}","${content}","${share_url}","${img_url_arr_str}")`;

    /*
    const sql = `insert into moments (id,content,share_url,img_url) VALUES
    ("${id}","${content}","${share_url}","${img_url_arr_str}")`;
    console.log('sql___',sql)
    */

    const row = {
      content: content,
      share_url: share_url,
      img_url: img_url_arr_str,
    };

    try {
      const result = await this.momentRepo.save(row);
      // console.log("add return",result)
      return { code: 200, msg: '查询成功', data: null };
    } catch (error) {
      // console.log("sql error:",error)
      // console.log("sql error:====>",error.sqlMessage)
      return { code: 500, msg: error.sqlMessage, data: null };
    }
  }

  /*
  util method:
  */
  private async addMonentUtil(moments: Moments) {}

  public async queryMoments(currentPage: number, pageSize: number) {
    let totalCount = 0;

    try {
      const sql = 'SELECT COUNT(*) as totalCount FROM moments;';
      const result = await this.momentRepo.query(sql);
      totalCount = parseInt(result[0].totalCount);
    } catch (error) {
      console.log('query total error:', error);
    }

    try {
      const sql = `select * from moments order by created_time desc limit ${
        (currentPage - 1) * pageSize
      },${pageSize}`;
      const result = await this.momentRepo.query(sql);
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
