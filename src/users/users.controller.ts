import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersResponseDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('all')
    @Serialize(UsersResponseDto)
    @UseGuards(ThrottlerGuard)
    public async allUser():
        Promise<UsersResponseDto[]> {
        const result = await
            this.usersService.getAllUser();
        return result;
    }

}
