import { Controller, Inject, Param, Body, Get, Post } from '@nestjs/common';
import { Result } from '../common/result.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  // http://localhost:3800/user/20
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
    console.log('findone---->');
    const data = await this.userService.findOne(id);

    return { code: 200, message: '查询成功', data };
  }

  /*
  account
  nickname
  password
  */
  @Post('register')
  async register(@Body() body) {
    const account: string = body.account;
    const nickname: string = body.nickname;
    const password: string = body.password;
    const data = await this.userService.register(account, nickname, password);

    return data;
  }

  @Post('login')
  async login(@Body() body) {
    const account: string = body.account;
    const password: string = body.password;
    const data = await this.userService.login(account, password);

    return data;
  }
}
