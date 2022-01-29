import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../config/db'
import { getDirFilenames } from './utils/getDirFilenames';
// import { CryptoWalletController } from './trader/crypto-wallet/crypto-wallet.controller';
// import { CryptoWalletModule } from './trader/crypto-wallet/crypto-wallet.module';
// import { TradingModule } from './trader/trading/trading.module';
// import { UserModule } from './trader/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
      // TradingModule,
      // CryptoWalletModule,
      // UserModule,
      TypeOrmModule.forRoot(dbConfig),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
