import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: string) {
    const sql = `select * from user where id = ${id}`;
    console.log('findOne', sql);
    const list = await this.userRepo.query(sql);
    console.log('list', list);

    return list;
  }
}
