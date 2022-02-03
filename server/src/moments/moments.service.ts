import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { User } from './user.entity';
import { Moments } from './moments.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MomentsService {
  constructor(
    // 使用泛型注入对应类型的存储库实例
    @InjectRepository(Moments) private readonly momentRepo: Repository<Moments>,
  ) { }

  // public async findOneById(id: string): Promise<User> {
  public async findOneById(id: string): Promise<Moments> {
    console.log("根据ID查询单个信息:",id)
    console.log("process.env",process.env.DATABASE_USER)
    const userInfo = await this.momentRepo.findOne(id);
    if (!userInfo) {
        throw new HttpException(`指定 id=${id} 的用户不存在`, 404);
    }
    return userInfo;
  }

  // public async addMomonts(moments:Moments):Promise<Moments>{
  public async addMomont(moments:Moments){

    const { content, share_url,img_url } = moments

    const img_url_temp:string[] = img_url as any
    const img_url_arr_str = img_url_temp.join(',')
    /*
    const sql = `insert into moments (id,content,share_url,img_url) VALUES
    ("${uuidv4()}","${content}","${share_url}","${img_url_json}")`;
    */
    const sql = `insert into moments (id,content,share_url,img_url) VALUES
    ("${uuidv4()}","${content}","${share_url}","${img_url_arr_str}")`;

    console.log('sql___',sql)
    const result = await this.momentRepo.query(sql);

    console.log("add return",result)
    return null
  }

  /*
  util method:
  */
  private async addMonontUtil(moments:Moments) {}
}
