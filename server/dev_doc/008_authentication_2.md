


https://docs.nestjs.cn/8/security?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89



## 身份认证
nest/sample/19-auth-jwt/


```
客户端将首先使用用户名和密码进行身份验证。一旦通过身份验证，服务器将发出 JWT，该 JWT 可以在后续请求的授权头中作为 token发送，以验证身份验证。我们还将创建一个受保护的路由，该路由仅对包含有效 JWT 的请求可访问。
```

## 第一个需求开始:验证用户
然后我们将通过发行 JWT 来扩展它。最后，我们将创建一个受保护的路由，用于检查请求上的有效 JWT 。

依赖
```
$ npm install --save @nestjs/passport passport passport-local
yarn add @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
yarn add @types/passport-local
```


```
对于您选择的任何 Passport 策略，都需要 @nestjs/Passport 和 Passport 包。然后，需要安装特定策略的包(例如，passport-jwt 或 passport-local)，它实现您正在构建的特定身份验证策略。

此外，您还可以安装任何 Passport策略的类型定义，如上面的 @types/Passport-local 所示，它在编写 TypeScript 代码时提供了帮助。
```

## Passport 策略
现在可以实现身份认证功能了。我们将首先概述用于任何 Passport 策略的流程。

将 Passport 本身看作一个框架是有帮助的。框架的优雅之处在于，它将身份验证过程抽象为几个基本步骤，您可以根据实现的策略对这些步骤进行自定义。

它类似于一个框架，因为您可以通过提供定制参数(作为 JSON 对象)和回调函数( Passport 在适当的时候调用这些回调函数)的形式来配置它。

 @nestjs/passport 模块将该框架包装在一个 Nest 风格的包中，使其易于集成到 Nest 应用程序中。

 #### 在 vanilla Passport 中，您可以通过提供以下两项配置策略:
 ```
 1.组特定于该策略的选项。例如，在 JWT 策略中，您可以提供一个秘令来对令牌进行签名。

2.“验证回调”，在这里您可以告诉 Passport 如何与您的用户存储交互(在这里您可以管理用户帐户)。在这里，验证用户是否存在(或创建一个新用户)，以及他们的凭据是否有效。Passport 库期望这个回调在验证成功时返回完整的用户消息，在验证失败时返回 null(失败定义为用户没有找到，或者在使用 Passport-local 的情况下，密码不匹配)。
 ```
 使用 @nestjs/passport ，您可以通过扩展 PassportStrategy 类来配置 passport 策略。通过调用子类中的 super() 方法传递策略选项(上面第1项)，可以选择传递一个 options 对象。通过在子类中实现 validate() 方法，可以提供verify 回调(上面第2项)。

我们将从生成一个 AuthModule 开始，其中有一个 AuthService :
```
nest g module auth
nest g service auth
```

当我们实现 AuthService 时，我们会发现在 UsersService 中封装用户操作是很有用的，所以现在让我们生成这个模块和服务:
$ nest g module users
$ nest g service users

users/users.service.ts
```js
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```

在 UsersModule 中，惟一需要做的更改是将 UsersService 添加到 @Module 装饰器的 exports 数组中，以便提供给其他模块外部可见(我们很快将在 AuthService 中使用它)。

users/users.module.ts
```js
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

#### 现在，我们更新 AuthModule 来导入 UsersModule 。
auth/auth.module.ts
```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
```