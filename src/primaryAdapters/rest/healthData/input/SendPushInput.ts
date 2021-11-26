import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { NotificationType } from '../../../../core/data/NotificationType';

export class SendPushInput {
    @IsString()
    @MinLength(5, { message: 'userId is too short' })
    @ApiProperty({
        type: String,
        minLength: 5,
    })
    userId: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'notificationToken is too short' })
    @ApiProperty({
        type: String,
        minLength: 10,
        example: 'token-010102013123-sd',
    })
    notificationToken: string;

    @IsEnum(NotificationType)
    @IsOptional()
    @ApiProperty({
        enum: NotificationType,
    })
    notificationType: NotificationType;
}
