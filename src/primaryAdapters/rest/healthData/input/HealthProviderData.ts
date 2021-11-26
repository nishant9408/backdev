import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { HealthProviderName } from '../../../../core/data/HealthProviderName';

export class HealthProviderData {
    @IsEnum(HealthProviderName)
    @ApiProperty({ enum: HealthProviderName })
    name: HealthProviderName;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        nullable: true,
        description: 'required for FITBIT',
    })
    accessToken: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        nullable: true,
        description: 'required for FITBIT',
    })
    refreshToken: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        nullable: true,
        description: 'required for FITBIT',
    })
    userId: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        nullable: true,
        description: 'required for FITBIT',
    })
    tokenType: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        nullable: true,
        description: 'required for FITBIT',
    })
    scope: string | null;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        type: Number,
        nullable: true,
        description: 'required for FITBIT',
    })
    expiresIn: number | null;
}
