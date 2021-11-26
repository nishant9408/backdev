import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

import { BaseAuthInput } from './BaseAuthInput';

export class LoginInput extends BaseAuthInput {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(7, {
        message: 'Wrong email or password.',
    })
    @ApiProperty({
        minLength: 7,
    })
    password: string;
}
