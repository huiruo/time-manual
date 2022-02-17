import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async findOne(id: string) {
    const sql = `select * from user where id = ${id}`;
    const list = await this.userRepo.query(sql);

    return list;
  }

  // 判断是否有昵称
  private async findNickname(nickname: string): Promise<number> {
    /*
    const sql = `select * from user where nickname = '${nickname}'`;
    const list = await this.userRepo.query(sql);
    */
    try {
      const nicknameData = await this.userRepo.findOne({ nickname });
      if (nicknameData) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      return 3;
    }
  }

  // 判断是否账户注册
  private async findAccount(account: string): Promise<User> {
    /*
    const sql = `select * from user where account = '${account}'`;
    const list = await this.userRepo.query(sql);
    */
    try {
      const accountData = await this.userRepo.findOne({ account });

      return accountData;
    } catch (error) {
      console.log('error', error);

      return null;
    }
  }

  private async registerUtil(account, nickname, password): Promise<User> {
    try {
      const res = await this.userRepo.save({ account, nickname, password });

      return res;
    } catch (error) {
      console.log('error', error);

      return error;
    }
  }

  public async register(account: string, nickname: string, password: string) {
    const hasNickname = await this.findNickname(nickname);

    let hasAccount = 0;
    const accountData = await this.findAccount(account);
    if (accountData) {
      hasAccount = 1;
    } else {
      hasAccount = 0;
    }

    const data = {
      hasNickname,
      hasAccount,
    };

    if (hasNickname === 0 && hasAccount === 0) {
      const res: User = await this.registerUtil(account, nickname, password);
      const resData = {
        account: res.account,
        nickname: res.nickname,
      };

      return { code: 200, msg: '注册成功', data: resData };
    } else {
      let msgHasNickname = '';
      let msgHasAccount = '';

      if (hasNickname === 1) {
        if (hasAccount === 1) {
          msgHasNickname = '昵称被使用,';
        } else {
          msgHasNickname = '昵称被使用';
        }
      }

      if (hasAccount === 1) {
        msgHasAccount = '账号被使用';
      }

      return { code: 500, msg: msgHasNickname + msgHasAccount, data };
    }
  }

  public async login(account: string, password: string) {
    const accountData = await this.findAccount(account);
    if (accountData) {
      const { password: passwordServer, nickname } = accountData;
      if (password === passwordServer) {
        const data = {
          account,
          nickname,
        };

        return { code: 200, msg: '登录成功', data: data };
      } else {
        return { code: 500, msg: '密码错误', data: null };
      }
    } else {
      return { code: 500, msg: '账号不存在', data: null };
    }
  }
}
