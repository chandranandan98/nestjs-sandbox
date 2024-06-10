import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/services/prisma.service';
import { PasswordService } from 'src/services/password.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 5,
    }]),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    PrismaService,
    PasswordService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  exports: [AccountService]

})
export class AccountModule { }
