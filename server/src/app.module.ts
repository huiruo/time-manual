import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../config/db'
import { getDirFilenames } from './utils/getDirFilenames';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MomentsController } from './moments/moments.controller';
import { MomentsModule } from './moments/moments.module';

@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../static'),
      }),
      ConfigModule.forRoot({
        envFilePath:[...getDirFilenames({environment:process.env.NODE_ENV})],
        isGlobal: true,
        ignoreEnvVars:true,
      }),
      MomentsModule,
      TypeOrmModule.forRoot(dbConfig),
    ],
    controllers: [AppController, MomentsController],
    providers: [AppService]
})
export class AppModule {}
