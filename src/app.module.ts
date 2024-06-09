import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import  configService  from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configService],
    }),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
