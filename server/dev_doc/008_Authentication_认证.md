

## 认证前言

https://www.itying.com/nestjs/article-index-id-117.html
```
passport是目前最流行的node.js认证库，为社区所熟知，并相继应用于许多生产应用中。将此工具与Nest框架集成起来非常简单。为了演示，我们将设置 passport-http-bearer 和 passport-jwt 策略。
```

```
Passport是最流行的node.js身份验证库，为社区所熟知，并成功地应用于许多生产应用程序中。将这个库与使用@nestjs/passport模块的Nest应用程序集成起来非常简单。在较高级别，Passport执行一系列步骤以：

通过验证用户的"证"(例如用户名/密码、JSON Web令牌(JWT)或身份提供者的身份令牌)来验证用户的身份。
管理经过身份验证的状态(通过发出可移植的令牌，例如JWT，或创建一个Express会话)
将有关经过身份验证的用户的信息附加到请求对象，以便在路由处理程序中进一步使用
```

## 实例
https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt