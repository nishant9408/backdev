import { FoodAndScore } from '../../../../core/data/FoodAndScore';
import { Mapper } from '../../../../core/sharedKernel/interfaces/Mapper';
import { FoodAndScoreOutput } from '../data/FoodAndScoreOutput';
import { ImagesOutput } from '../data/ImagesOutput';
import { MealOutput } from '../data/MealOutput';

export class FoodAndScoreOutputMapper implements Mapper<FoodAndScore, FoodAndScoreOutput> {
    public map(from: FoodAndScore): FoodAndScoreOutput {
        return FoodAndScoreOutput.fromObject({
            fitsTarget: from.fitsTarget,
            fitsDiet: from.fitsDiet,
            personalMatch: from.personalMatch,
            nutritionScore: from.foodInformation.nutritionScore,
            productName: from.foodInformation.productName,
            images: ImagesOutput.fromObject(from.foodInformation.images),
            recommendation: from.recommendation.map(r => MealOutput.fromObject(r)),
        });
    }
}

const FoodAndScoreOutputMapperType = Symbol.for('FoodAndScoreOutputMapper');
export { FoodAndScoreOutputMapperType };
