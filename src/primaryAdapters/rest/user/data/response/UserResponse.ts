import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';
import { HealthCondition } from '../../../../../core/data/HealthCondition';
import { Diet } from '../../../../../core/data/Diet';
import { GenderType } from '../../../../../core/data/GenderType';
import { Region } from '../../../../../core/data/Region';

interface UserResponseBuilder {
    id: number | null;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: GenderType;
    height: number;
    weight: number;
    targetWeight: number;
    weightLossIntensity: number;
    averageSleepingTime: number;
    foodIntolerance: string[];
    diet: Diet;
    foods: string[];
    timezone: string;
    notificationToken: string;
    healthCondition: HealthCondition;
    region: Region;
    country: string
}

export class UserResponse {
    @ApiProperty({ type: Number, nullable: true })
    id: number | null;

    @IsString()
    @MinLength(7, { message: 'Password is too short. Min length is 7 symbols.' })
    @ApiProperty({ minLength: 7 })
    password: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
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
    averageSleepingTime: number;

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

    @IsEnum(Diet)
    @ApiProperty({ enum: Diet })
    diet: string;

    @IsArray()
    @ApiProperty()
    foods: string[];

    @IsString()
    @ApiProperty()
    timezone: string;

    @IsString()
    @ApiProperty()
    notificationToken: string;

    @IsEnum(HealthCondition)
    @ApiProperty({ enum: HealthCondition})
    healthCondition :string;

    @IsEnum(Region)
    @ApiProperty({ enum: Region})
    region :string;

    @IsString()
    @ApiProperty()
    country: string;


    public static fromObject(builder: UserResponseBuilder): UserResponse {
        const user = new UserResponse();
        user.id = builder.id;
        user.timezone = builder.timezone;
        user.notificationToken = builder.notificationToken;
        user.name = builder.name;
        user.email = builder.email;
        user.age = builder.age;
        user.password = builder.password;
        user.foodIntolerance = builder.foodIntolerance;
        user.foods = builder.foods;
        user.averageSleepingTime = builder.averageSleepingTime;
        user.gender = builder.gender;
        user.diet = builder.diet;
        user.height = builder.height;
        user.weightLossIntensity = builder.weightLossIntensity;
        user.weight = builder.weight;
        user.targetWeight = builder.targetWeight;
        user.healthCondition = builder.healthCondition;
        user.region = builder.region;
        user.country = builder.country;
        return user;
    }
}
