import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsString, MinLength } from 'class-validator';

export class LocationInput {
    @IsString()
    @MinLength(5, { message: 'userId is too short' })
    @ApiProperty({
        type: String,
        minLength: 5,
    })
    userId: string;

    @IsLongitude()
    @ApiProperty({ type: Number })
    longitude: number;

    @IsLatitude()
    @ApiProperty({ type: Number })
    latitude: number;

    @IsString()
    @ApiProperty({ example: 'Europe/Kiev' })
    timezone: string;
}
