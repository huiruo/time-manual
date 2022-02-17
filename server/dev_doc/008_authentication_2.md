


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
```js
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
```

#### 现在我们可以实现 Passport 本地身份验证策略。

在auth文件夹中创建一个名为 local.strategy.ts 文件，并添加以下代码:
```js
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

我们遵循了前面描述的所有护照策略。在我们的 passport-local 用例中，没有配置选项，因此我们的构造函数只是调用 super() ，没有 options 对象。
我们还实现了 validate() 方法。对

于每个策略，Passport 将使用适当的特定于策略的一组参数调用 verify 函数(使用 @nestjs/Passport 中的 validate() 方法实现)。

对于本地策略，Passport 需要一个具有以下签名的 validate() 方法: validate(username: string, password: string): any。

#### validate()
```
大多数验证工作是在我们的 AuthService 中完成的(在 UserService 的帮助下)，所以这个方法非常简单。

任何 Passport 策略的 validate() 方法都将遵循类似的模式，只是表示凭证的细节方面有所不同。
如果找到了用户并且凭据有效，则返回该用户，以便 Passport 能够完成其任务(例如，在请求对象上创建user 属性)，并且请求处理管道可以继续。如果没有找到，我们抛出一个异常，让异常层处理它。

通常，每种策略的 validate() 方法的惟一显著差异是如何确定用户是否存在和是否有效。
例如，在 JWT 策略中，根据需求，我们可以评估解码令牌中携带的 userId 是否与用户数据库中的记录匹配，或者是否与已撤销的令牌列表匹配。因此，这种子类化和实现特定于策略验证的模式是一致的、优雅的和可扩展的。
```

#### 我们需要配置 AuthModule 来使用刚才定义的 Passport 特性。
更新 auth.module。看起来像这样:
auth/auth.module.ts
```js
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```


## 内置 Passport 守卫

守卫章节描述了守卫的主要功能:确定请求是否由路由处理程序。
从身份验证的角度来看，您的应用程序可以以两种状态存在:
```
1.用户/客户端未登录(未通过身份验证)
2.用户/客户端已登录(已通过身份验证)
```

在第一种情况下(用户没有登录)，我们需要执行两个不同的功能:
```
1.限制未经身份验证的用户可以访问的路由（即拒绝访问受限制的路由）。 我们将使用熟悉的警卫来处理这个功能，方法是在受保护的路由上放置一个警卫。我们将在这个守卫中检查是否存在有效的 JWT ，所以我们稍后将在成功发出 JWT 之后处理这个守卫。

2.当以前未经身份验证的用户尝试登录时，启动身份验证步骤。这时我们向有效用户发出 JWT 的步骤。考虑一下这个问题，我们知道需要 POST 用户名/密码凭证来启动身份验证，所以我们将设置 POST /auth/login 路径来处理这个问题。这就提出了一个问题:在这条路由上，我们究竟如何实施“护照-本地”战略?

答案很简单:使用另一种稍微不同类型的守卫。
@nestjs/passport 模块为我们提供了一个内置的守卫，可以完成这一任务。这个保护调用 Passport 策略并启动上面描述的步骤(检索凭证、运行verify 函数、创建用户属性等)。
```
## 登录路由
有了这个策略，我们现在就可以实现一个简单的 /auth/login 路由，并应用内置的守卫来启动护照本地流。 打开 app.controller.ts 文件，并将其内容替换为以下内容:

app.controller.ts
```js
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
```

```
对于 @UseGuard(AuthGuard('local'))，我们使用的是一个 AuthGuard ，它是在我们扩展护照-本地策略时 @nestjs/passportautomatic 为我们准备的。

我们来分析一下。我们的 Passport 本地策略默认名为"local" 。
我们在 @UseGuards() 装饰器中引用这个名称，以便将它与护照本地包提供的代码关联起来。这用于消除在应用程序中有多个 Passport 策略时调用哪个策略的歧义(每个策略可能提供一个特定于策略的 AuthGuard )。
虽然到目前为止我们只有一个这样的策略，但我们很快就会添加第二个，所以这是消除歧义所需要的。
```

#### 测试登录路由
为了测试我们的路由，我们将 /auth/login 路由简单地返回用户。

这还允许我们演示另一个 Passport 特性: Passport 根据从 validate() 方法返回的值自动创建一个 user 对象，并将其作为 req.user 分配给请求对象。稍后，

我们将用创建并返回 JWT 的代码替换它。
```curl
$ # POST to /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"userId":1,"username":"john"}

http://localhost:3800/auth/login?account=abchena&password=123
```

#### 如果上述内容可以正常工作，可以通过直接将策略名称传递给AuthGuard()来引入代码库中的魔术字符串。作为替代，我们推荐创建自己的类，如下所示：

auth/local-auth.guard.ts
```js
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```



## JWT 功能
让我们回顾并完善我们的需求
```
1.允许用户使用用户名/密码进行身份验证，返回 JWT 以便在后续调用受保护的 API 端点时使用。我们正在努力满足这一要求。为了完成它，我们需要编写发出 JWT 的代码。

2.创建基于token 的有效JWT 的存在而受保护的API路由。
```

我们需要安装更多的包来支持我们的 JWT 需求:
```
$ npm install @nestjs/jwt passport-jwt
$ npm install @types/passport-jwt --save-dev
yarn add @nestjs/jwt passport-jwt
yarn add @types/passport-jwt

对于您选择的任何 Passport 策略，都需要 @nestjs/Passport 和 Passport 包。然后，需要安装特定策略的包(例如，passport-jwt 或 passport-local)，它实现您正在构建的特定身份验证策略。此外，您还可以安装任何 Passport策略的类型定义，如上面的 @types/Passport-local 所示，它在编写 TypeScript 代码时提供了帮助。
```

```
让我们仔细看看如何处理 POST /auth/login 请求。我们使用护照本地策略提供的内置AuthGuard 来装饰路由。这意味着:

1.只有在了用户之后，才会调用路由处理程序
2.req参数将包含一个用户属性(在passport-local 身份验证流期间由 Passport 填充)
```

考虑到这一点，我们现在终于可以生成一个真正的 JWT ，并以这种方式返回它。为了使我们的服务保持干净的模块化，我们将在 authService 中生成 JWT 。

在auth文件夹中添加 auth.service.ts 文件，并添加 login() 方法，导入JwtService ，如下图所示:

##### auth/auth.service.ts
auth.service.ts 文件，并添加 login() 方法，导入JwtService ，如下图所示:
```js
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

```
我们使用 @nestjs/jwt 库，该库提供了一个 sign() 函数，用于从用户对象属性的子集生成 jwt，然后以简单对象的形式返回一个 access_token 属性。

注意:我们选择 sub 的属性名来保持我们的 userId 值与JWT 标准一致。不要忘记将 JwtService 提供者注入到 AuthService中。
```

现在，我们需要更新 AuthModule 来导入新的依赖项并配置 JwtModule 。

首先，在auth文件夹下创建 auth/constants.ts，并添加以下代码:
```js
/*
我们将使用它在 JWT 签名和验证步骤之间共享密钥。

不要公开此密钥。我们在这里这样做是为了清楚地说明代码在做什么，
但是在生产系统中，您必须使用适当的措施来保护这个密钥，
比如机密库、环境变量或配置服务。
*/
export const jwtConstants = {
  secret: 'secretKey',
};
```

#### 现在,在auth 文件夹下 auth.module.ts，并更新它看起来像这样:
```js
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

#### 现在我们可以更新 /auth/login 路径来返回 JWT 。
app.controller.ts
```js
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
```

```
让我们继续使用 cURL 测试我们的路由。您可以使用 UsersService 中硬编码的任何用户对象进行测试。

$ # POST to /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
$ # Note: above JWT truncated
```





## 实施 Passport JWT
我们现在可以处理我们的最终需求:通过要求在请求时提供有效的 JWT 来保护端点。

护照对我们也有帮助。它提供了用于用 JSON Web 标记保护 RESTful 端点的 passport-jwt 策略。在 auth 文件夹中 jwt.strategy.ts，并添加以下代码:

jwt.strategy.ts
```js
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

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
    return { userId: payload.sub, username: payload.username };
  }
}
```

#### 在 AuthModule 中添加新的 JwtStrategy 作为提供者:
auth/auth.module.ts
```js
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

通过导入 JWT 签名时使用的相同密钥，我们可以确保 Passport 执行的验证阶段和 AuthService 执行的签名阶段使用公共密钥。
实现受保护的路由和 JWT 策略保护，我们现在可以实现受保护的路由及其相关的保护。

app.controller.ts 文件，更新如下:
```js
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

同样，我们将应用在配置 passport-jwt 模块时 @nestjs/passport 模块自动为我们提供的 AuthGuard 。
这个保护由它的默认名称 jwt 引用。当我们请求 GET /profile 路由时，保护程序将自动调用我们的 passport-jwt 自定义配置逻辑，验证 JWT ，并将用户属性分配给请求对象。

确保应用程序正在运行，并使用 cURL 测试路由。
```
$ # GET /profile
$ curl http://localhost:3000/profile
$ # result -> {"statusCode":401,"error":"Unauthorized"}

$ # POST /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }

$ # GET /profile using access_token returned from previous step as bearer code
$ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
$ # result -> {"userId":1,"username":"john"}
```

```
注意，在 AuthModule 中，我们将 JWT 配置为 60 秒过期。这个过期时间可能太短了，而处理令牌过期和刷新的细节超出了本文的范围。
然而，我们选择它来展示JWT 的一个重要品质和 jwt 护照战略。如果您在验证之后等待 60 秒再尝试 GET /profile 请求，您将收到 401 未授权响应。
这是因为 Passport 会自动检查 JWT 的过期时间，从而省去了在应用程序中这样做的麻烦。
```


## 默认策略
```
在我们的 AppController 中，我们在 @AuthGuard() 装饰器中传递策略的名称。

我们需要这样做，因为我们已经介绍了两种 Passport 策略(护照本地策略和护照 jwt 策略)，这两种策略都提供了各种 Passport 组件的实现。

传递名称可以消除我们链接到的实现的歧义。当应用程序中包含多个策略时，我们可以声明一个默认策略，这样如果使用该默认策略，我们就不必在 @AuthGuard 装饰器中传递名称。下面介绍如何在导入 PassportModule 时注册默认策略。这段代码将进入 AuthModule :

要确定默认策略行为，您可以注册 PassportModule 。
```