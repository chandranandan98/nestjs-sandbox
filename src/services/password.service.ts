import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
    constructor() { }

    validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }

    hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return hash(password, saltOrRounds);
    }
    
}
