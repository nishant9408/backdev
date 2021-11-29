import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';
import { Healthcondition } from '../../../../../core/data/Healthcondition';
import { Diet } from '../../../../../core/data/Diet';
import { Food } from '../../../../../core/data/Food';
import { GenderType } from '../../../../../core/data/GenderType';
import { Region } from '../../../../../core/data/Region';

export class UpdateUserInput {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    email: string;

    @IsNumber()
    @Min(6)
    @Max(100)
    @IsOptional()
    @ApiProperty({ required: false })
    age: number;

    @IsEnum(GenderType)
    @IsOptional()
    @ApiProperty({ required: false, enum: GenderType })
    gender: GenderType;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    height: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    weight: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    targetWeight: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    weightLossIntensity: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false })
    foodIntolerance: string[];

    @IsEnum(Diet)
    @IsOptional()
    @ApiProperty({ required: false, enum: Diet })
    diet: Diet;

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false, enum: Food, isArray: true })
    foods: Food[];

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    notificationToken: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    timezone: string;

    @IsEnum(Healthcondition)
    @IsOptional()
    @ApiProperty({ required: false, enum: Healthcondition })
    healthcondition: Healthcondition;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    location_new: string;

    @IsEnum(Region)
    @IsOptional()
    @ApiProperty({ required: false, enum: Region })
    region: Region;
}
