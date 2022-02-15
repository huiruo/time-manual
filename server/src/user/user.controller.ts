import { Controller, Inject, Param, Get } from '@nestjs/common';
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
}
