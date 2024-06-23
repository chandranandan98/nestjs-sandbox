import { Expose } from "class-transformer";

export class UsersResponseDto {

    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    isActive: boolean;
}