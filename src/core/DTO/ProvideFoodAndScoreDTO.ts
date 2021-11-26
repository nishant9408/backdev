import { FoodScore } from '../data/FoodScore';

export interface ProvideFoodAndScoreDTO {
    userId: number;
    barcode: string;
    nutritionScore?: FoodScore;
}
