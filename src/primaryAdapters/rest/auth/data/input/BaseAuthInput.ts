import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export abstract class BaseAuthInput {
    @IsString()
    @ApiProperty({ example: 'basic' })
    scope: string;

    @IsString()
    @ApiProperty({ example: 'web' })
    client_id: string;

    @IsString()
    @ApiProperty({ enum: [ 'password', 'refresh_token' ] })
    grant_type: string;

    @IsString()
    @ApiProperty({ example: 'web-client' })
    client_secret: string;
}
