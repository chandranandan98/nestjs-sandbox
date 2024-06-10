import { Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto, RegisterUserResponseDto, UsersResponseDto } from 'src/account/dto/user.dto';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('account')
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Serialize(RegisterUserResponseDto)
    @Post('register')
    public async register(@Body() createUserDto: RegisterUserDto):
        Promise<RegisterUserResponseDto> {
        const result = await
            this.accountService.register(createUserDto);
        return result;
    }

    @Serialize(UsersResponseDto)
    @Get('users')
    @UseGuards(ThrottlerGuard)
    public async allUser():
        Promise<UsersResponseDto[]> {
        const result = await
            this.accountService.getAllUser();
        return result;
    }
}