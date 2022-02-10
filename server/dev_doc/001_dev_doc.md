## init
```
nest new time-manual
```

## 模块
Controller 、Service、module ,形成了一个模块
```
1.Controller ：控制器，主要作用：提供api接口，负责处理路由，中转，验证等一些简洁业务

2.Service：又称为 Provider ，是一系列服务，repo，工厂方法，helper的总称。主要负责处理具体的业务，如数据库的增删改查，事务，并发等逻辑代码

3.Module：负责将Controller和Service连接起来
```

```js
直接使用nest-cli创建:
nest g [文件类型] [文件名] [文件目录（src目录下）]

1.首先创建Service，因为Controller和Module都需要引入:
	//创建sevice类型的文件，文件名：user，文件目录为：trader
	nest g service user trader

2.Service
	nest g controller user trader

3.Module
	nest g module user trader
```

```js
//1.在user.service.ts里写：
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async findOne(id:string){
    let sql = `select * from user where id = ${id}`;
    console.log('findOne',sql)
    let list = await this.userRepo.query(sql);
    console.log('list',list)
    return list
  }
}

//2.在 Controller 把Service的业务逻辑引入
import { Controller,Inject,Param,Get } from '@nestjs/common';
import { Result } from '../common/result.interface';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
      @Inject(ArticleService) private readonly ArticleService: ArticleService,
  ) {} 

  // http://localhost:3800/article/20
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
      console.log('findone---->')
      const data = await this.ArticleService.findOne(id);
      return { code: 200, message: '查询成功', data };
  }
}

//3.把Service和Controller组装起来
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule {}

第三步的作用
就是其他Module想引入User的时候，就不能同时引入Service和Controller了，然后修改下app.module.ts

4.修改下app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './trader/user/user.service';
// import { UserController } from './trader/user/user.controller';
import { UserModule } from './trader/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```