import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto, RegisterUserResponseDto } from 'src/account/dto/user.dto';
import { Serialize } from 'src/interceptors/serializer.interceptor';

@ApiTags('account')
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Serialize(RegisterUserResponseDto)
    @Post('register')
    public async register(@Body() createUserDto: RegisterUserDto):
        Promise<any> {
        const result = await
            this.accountService.register(createUserDto);
        return result;
    }
}