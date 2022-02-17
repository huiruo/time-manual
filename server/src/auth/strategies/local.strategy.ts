/**
 * 本地验证策略代码
 */
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(account: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

/*
1.首先定义了一个LocalStorage继承至@nestjs/passport提供的PassportStrategy类, 接受两个参数
  第一个参数: Strategy，你要用的策略，这里是passport-local

  第二个参数:是策略别名，上面是passport-local,默认就是local

2.接着调用super传递策略参数， 这里如果传入的就是username和password，可以不用写，使用默认的参数就是，
比如我们是用邮箱进行验证，传入的参数是email, 那usernameField对应的value就是email。

3.validate是LocalStrategy的内置方法， 主要实现了用户查询以及密码对比，因为存的密码是加密后的，
没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码。

有了这个策略，我们现在就可以实现一个简单的 /auth/login 路由，
并应用Nest.js内置的守卫AuthGuard来进行验证。打开 app.controller.ts 文件，并将其内容替换为以下内容:
@ApiTags('验证')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return req.user;
  }
}
*/
