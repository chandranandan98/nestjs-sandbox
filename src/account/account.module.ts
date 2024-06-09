import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/services/prisma.service';
import { PasswordService } from 'src/services/password.service';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    PrismaService,
    PasswordService
    ],
  exports:[AccountService]
  
})
export class AccountModule {}
