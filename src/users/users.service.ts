import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UsersResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService
    ) {
    }

    async getAllUser(): Promise<UsersResponseDto[]>{
        const users = await this.prisma.user.findMany();
        return users
    }

    async getUserByEmail(email: string): Promise<any>{
        const user = await this.prisma.user.findFirst({
            where: {
                email:email
            }
        })
        return user
    }

}
