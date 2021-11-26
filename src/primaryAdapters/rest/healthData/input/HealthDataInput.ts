import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { GenderType } from '../../../../core/data/GenderType';

export class HealthDataInput {
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        nullable: true,
        example: '1996-11-26',
        description: 'any date type',
    })
    dateOfBirth: string | null;

    @IsEnum(GenderType)
    @IsOptional()
    @ApiProperty({ enum: GenderType, nullable: true })
    gender: GenderType | null;

    @IsInt()
    @Min(0)
    @ApiProperty({ type: Number, minimum: 1 })
    stepCount: number;

    @IsInt()
    @Min(0)
    @ApiProperty({ type: Number, description: 'integer' })
    workoutCount: number;
}
