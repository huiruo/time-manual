import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async findOne(username:string){
    let sql = 'select * from user;
    let list = await this.userRepo.query(sql);
    console.log('list',list)
    return list
  }
}
