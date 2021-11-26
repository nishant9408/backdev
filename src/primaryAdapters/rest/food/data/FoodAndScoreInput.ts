import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { FoodScore } from '../../../../core/data/FoodScore';

export class FoodAndScoreInput {
    @IsString()
    @MinLength(5)
    @ApiProperty({
        type: String,
        minLength: 5,
    })
    barcode: string;

    @IsEnum(FoodScore)
    @IsOptional()
    @ApiProperty({
        type: String, enum: FoodScore,
    })
    nutritionScore: FoodScore;
}
