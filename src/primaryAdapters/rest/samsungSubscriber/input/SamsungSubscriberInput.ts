import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SamsungSubscriberInput {
    @IsEmail()
    @ApiProperty({ type: String, example: 'test.email@gmail.co' })
    email: string;
}
