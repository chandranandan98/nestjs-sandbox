import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, SignUpDto, SignUpResponseDto } from './dto/userAuth.dto';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/services/password.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        private passwordService: PasswordService
    ) { }

    @Serialize(SignUpResponseDto)
    @Post('signup')
    public async signup(@Body() createUserDto: SignUpDto):
        Promise<SignUpResponseDto> {
        const result = await
            this.authService.signUp(createUserDto);
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginDto): Promise<any> {

        // validate if user exits in the system 
        const user = await this.userService.getUserByEmail(loginUserDto.email)
        if (!user){
            throw new HttpException('User with the given email does not exits', HttpStatus.NOT_FOUND)
        }

        // validate the password of the exiting user
        const validatePassword = await this.passwordService.validatePassword(loginUserDto.password,user.password)
        if (!validatePassword){
            throw new HttpException('Provided password is incorrect!', HttpStatus.UNAUTHORIZED)
        }

        const result = await this.authService.signIn(loginUserDto)
        return result
    }
}