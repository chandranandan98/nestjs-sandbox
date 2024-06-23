import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {

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

export class SignUpResponseDto {
    
    @Expose()
    id: number;

    @Expose()
    email: string;
}

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}