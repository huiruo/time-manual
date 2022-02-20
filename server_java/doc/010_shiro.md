

https://www.cnblogs.com/yuwenS/p/15045474.html

## shiro有个核心组件，分别为Subject、SecurityManager和Realms
```
Subject：相当于当前操作的”用户“，这个用户不一定是一个具体的人，是一个抽象的概念，表明的是和当前程序进行交互的任何东西，例如爬虫、脚本、等等。所有的Subject都绑定到SecurityManager上，与 Subject 的所有交互都会委托给 SecurityManager；可以把 Subject 认为是一个门面；SecurityManager 才是实际的执行者。


SecurityManager：这个是shiro框架的核心，所有与安全相关的操作都会与它进行交互，它管理者所有的Subject。

Realms：充当了Shiro与应用安全数据间的”桥梁“，当对用户执行认证（登录）和授权（访问控制）验证时，SecurityManager 需要从 Realm 获取相应的用户进行比较以确定用户身份是否合法；也需要从 Realm 得到用户相应的角色 / 权限进行验证用户是否能进行操作。
```


```xml
<!--shiro-->
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring-boot-starter</artifactId>
    <version>1.7.1</version>
</dependency>
<!--shiro缓存-->
 <dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-ehcache</artifactId>
    <version>1.7.1</version>
</dependency>
```

## 整合需要实现的类
```
一般来说整合只需要完成两个类的实现即可
一个是 ShiroConfig 一个是 CustomerRealm
如果需要添加shiro缓存并且不是自带的缓存而是redis缓存还需要进行另外两个类的编写
一个是 RedisCache 一个是 RedisCacheManager
```