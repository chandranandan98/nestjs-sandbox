import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto, RegisterUserResponseDto } from 'src/account/dto/user.dto';
import { PasswordService } from 'src/services/password.service';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AccountService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService
    ) {
    }

    async register(userDto: RegisterUserDto): Promise<RegisterUserResponseDto> {
        const userExits = await this.prisma.user.findFirst({
            where: {
                email: userDto.email,
            },
        });

        if (userExits) {
            throw new HttpException('A user with the given credential exits', HttpStatus.CONFLICT);
        }

        const hashedPassword = await this.passwordService.hashPassword(userDto.password);
        userDto.password = hashedPassword;

        return await this.prisma.user.create({
            data: {
                email: userDto.email,
                password: userDto.password,
                firstName: userDto.firstName,
                lastName: userDto.lastName,
            },
        });
    }
    
}