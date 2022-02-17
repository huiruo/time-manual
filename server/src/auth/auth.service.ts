import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(account: string, pass: string): Promise<any> {
    console.log('validateUser', account, pass);
    const user = await this.userService.findByAccount(account);
    console.log('validateUser 2:', user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log('validateUser---->', result);

      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log('auth.service.ts login():', user);
    // const payload = { account: user.account, sub: user.userId };
    const payload = { account: user.account, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
