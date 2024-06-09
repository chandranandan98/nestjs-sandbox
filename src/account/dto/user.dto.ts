import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @MinLength(8, {
        message: 'Password should be minimum of 8 character',
    })
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export class RegisterUserResponseDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
