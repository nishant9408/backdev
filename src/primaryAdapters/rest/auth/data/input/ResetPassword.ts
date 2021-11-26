import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPassword {
    @IsEmail()
    @ApiProperty()
    email: string;
}
