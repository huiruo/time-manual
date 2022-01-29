import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './moments.entity';

@Injectable()
export class MomentsService {
  constructor(
    // 使用泛型注入对应类型的存储库实例
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  findOneTest(username:string):string{
      if(username==='huiruo'){
          return 'I am here';
      }
      return 'Who U find?';
  }

  // public async findOneById(id: string): Promise<User> {
  public async findOneById(id: string) {
  // public async findOneById(id: string) {
    console.log("根据ID查询单个信息:",id)
    console.log("process.env",process.env.DATABASE_USER)
    const userInfo = await this.userRepo.findOne(id);
    if (!userInfo) {
        throw new HttpException(`指定 id=${id} 的用户不存在`, 404);
    }
    return userInfo;
  }

}
