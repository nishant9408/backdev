import { ApiProperty } from '@nestjs/swagger';
import { FoodScore } from '../../../../core/data/FoodScore';
import { ImagesOutput } from './ImagesOutput';
import { MealOutput } from './MealOutput';

interface FoodAndScoreOutputBuilder {
    personalMatch: number | null;
    nutritionScore: FoodScore | null;
    productName: string | null;
    images: ImagesOutput;
    recommendation: MealOutput[] | null;
    fitsDiet: boolean | null;
    fitsTarget: boolean | null;
}

export class FoodAndScoreOutput {
    @ApiProperty({
        type: Number,
        minimum: 1,
        maximum: 10,
        nullable: true,
    })
    personalMatch: number | null;

    @ApiProperty({ enum: FoodScore, nullable: true })
    nutritionScore: FoodScore | null;

    @ApiProperty({ type: String, nullable: true })
    productName: string | null;

    @ApiProperty({ type: Boolean, nullable: true })
    fitsDiet: boolean | null;

    @ApiProperty({ type: Boolean, nullable: true })
    fitsTarget: boolean | null;

    @ApiProperty({ type: () => ImagesOutput })
    images: ImagesOutput;

    @ApiProperty({ type: () => MealOutput, nullable: true })
    recommendation: MealOutput[] | null;

    public static fromObject(builder: FoodAndScoreOutputBuilder): FoodAndScoreOutput {
        const response = new FoodAndScoreOutput();
        response.nutritionScore = builder.nutritionScore;
        response.productName = builder.productName;
        response.personalMatch = builder.personalMatch;
        response.images = builder.images;
        response.fitsDiet = builder.fitsDiet;
        response.fitsTarget = builder.fitsTarget;
        response.recommendation = builder.recommendation;
        return response;
    }
}
