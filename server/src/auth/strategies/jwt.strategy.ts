/*
对于我们的 JwtStrategy ，我们遵循了前面描述的所有 Passport 策略的相同配方。这个策略需要一些初始化，因此我们通过在 super() 调用中传递一个 options 对象来实现。
在我们的例子中，这些选项是:
jwtFromRequest:提供从请求中提取 JWT 的方法。我们将使用在 API 请求的授权头中提供token的标准方法。

ignoreExpiration:为了明确起见，我们选择默认的 false 设置，它将确保 JWT 没有过期的责任委托给
Passport 模块。这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应。护照会自动为我们办理。

secret orkey:我们使用权宜的选项来提供对称的秘密来签署令牌。其他选项，如 pemo 编码的公钥，可能更适合于生产应用程序
(有关更多信息，请参见此处)。如前所述，无论如何，不要把这个秘密公开。

validate() 方法值得讨论一下。对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，
该方法将解码后的 JSON 作为其单个参数传递。根据 JWT 签名的工作方式，我们可以保证接收到之前已签名并发给有效用户的有效 token 令牌。
因此，我们对 validate() 回调的响应很简单:我们只是返回一个包含 userId 和 username 属性的对象。再次回忆一下，
Passport 将基于 validate() 方法的返回值构建一个user 对象，并将其作为属性附加到请求对象上。

同样值得指出的是，这种方法为我们留出了将其他业务逻辑注入流程的空间(就像”挂钩”一样)。
例如，我们可以在 validate() 方法中执行数据库查询，以提取关于用户的更多信息，
从而在请求中提供更丰富的用户对象。这也是我们决定进行进一步令牌验证的地方，
例如在已撤销的令牌列表中查找 userId ，使我们能够执行令牌撤销。
我们在示例代码中实现的模型是一个快速的 "无状态JWT" 模型，
其中根据有效 JWT 的存在立即对每个 API 调用进行授权，
并在请求管道中提供关于请求者(其 userid 和 username)的少量信息。
*/

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // return { id: payload.sub, account: payload.account };
    return { userId: payload.sub, username: payload.account };
  }
}
