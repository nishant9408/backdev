import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshInput {
    @IsString()
    @ApiProperty({
        pattern: '/refresh_token/',
    })
    grant_type: string;

    @IsString()
    @ApiProperty()
    scope: string;

    @IsString()
    @ApiProperty()
    client_id: string;

    @IsString()
    @ApiProperty()
    client_secret: string;

    @IsString()
    @ApiProperty()
    refresh_token: string;
}
