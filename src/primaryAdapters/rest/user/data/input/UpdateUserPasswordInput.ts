import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordInput {
    @IsString()
    @MinLength(7, { message: 'Password is too short. Min length is 7 symbols.' })
    @ApiProperty({ minLength: 7 })
    oldPassword: string;

    @IsString()
    @MinLength(7, { message: 'Password is too short. Min length is 7 symbols.' })
    @ApiProperty({ minLength: 7 })
    newPassword: string;
}
