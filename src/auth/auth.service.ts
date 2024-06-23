import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PasswordService } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma.service';
import { LoginDto, SignUpDto, SignUpResponseDto } from './dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService,
        private jwtService: JwtService,
    ) {
    }


    async signUp(userSignUpDto: SignUpDto): Promise<SignUpResponseDto> {
        const userExits = await this.prisma.user.findFirst({
            where: {
                email: userSignUpDto.email
            }
        })

        if (userExits) {
            throw new HttpException('A user with the given credentail exits', HttpStatus.CONFLICT);
        }

        const hashedPassword = await this.passwordService.hashPassword(userSignUpDto.password)
        userSignUpDto.password = hashedPassword

        return await this.prisma.user.create({
            data: {
                email: userSignUpDto.email,
                password: userSignUpDto.password,
                firstName: userSignUpDto.firstName,
                lastName: userSignUpDto.lastName,
            },
        })
    }

    async signIn(loginDto: LoginDto): Promise<any>{

        const jwt = await this.jwtService.signAsync({loginDto})
        return {"token":jwt}
    }

    // async signIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    //     const { email, password } = loginDto;
    //     const user = await this.userRepository.findOne({ where: { email } });

    //     if (user && user.validatePassword(password)) {
    //         const userResponse = new LoginResponseDto();

    //         userResponse.username = user.username;
    //         userResponse.email = user.email;
    //         return userResponse;
    //     } else {
    //         return null;
    //     }
    // }
}
