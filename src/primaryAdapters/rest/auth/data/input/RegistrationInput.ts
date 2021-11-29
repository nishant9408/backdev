import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';
import { Healthcondition } from '../../../../../core/data/Healthcondition';
import { Diet } from '../../../../../core/data/Diet';
import { Food } from '../../../../../core/data/Food';
import { GenderType } from '../../../../../core/data/GenderType';
import { HealthProviderData } from '../../../healthData/input/HealthProviderData';

import { BaseAuthInput } from './BaseAuthInput';
import { Region } from '../../../../../core/data/Region';

export class    RegistrationInput extends BaseAuthInput {
    @IsString()
    @MinLength(7, { message: 'Password is too short. Min length is 7 symbols.' })
    @ApiProperty({ minLength: 7, example: '12312ads12da' })
    password: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNumber()
    @Min(6)
    @Max(100)
    @ApiProperty()
    age: number;

    @IsEnum(GenderType)
    @ApiProperty({ enum: GenderType })
    gender: GenderType;

    @IsNumber()
    @ApiProperty()
    height: number;

    @IsNumber()
    @ApiProperty()
    weight: number;

    @IsNumber()
    @ApiProperty()
    targetWeight: number;

    @IsNumber()
    @ApiProperty()
    weightLossIntensity: number;

    @IsArray()
    @ApiProperty()
    foodIntolerance: string[];

    @IsNumber()
    @ApiProperty()
    averageSleepingTime: number;

    @IsEnum(Diet)
    @ApiProperty({
        enum: Diet,
    })
    diet: Diet;

    @IsEnum(Healthcondition)
    @ApiProperty({
        enum: Healthcondition,
    })
    healthcondition: Healthcondition;

    @IsEnum(Region)
    @ApiProperty({
        enum: Region,
    })
    region: Region;

    @IsArray()
    @ApiProperty({ required: true, enum: Food, isArray: true })
    foods: Food[];

    @IsOptional()
    @ApiProperty()
    provider: HealthProviderData;

    @IsString()
    @ApiProperty({ example: 'Europe/Kiev' })
    timezone: string;

    @IsString()
    @ApiProperty({ example: '1qww2-swsw-dsa1' })
    notificationToken: string;
}
