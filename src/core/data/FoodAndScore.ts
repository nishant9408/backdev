import { FoodInformation } from './FoodInformation';
import { Meal } from './Meal';

interface FoodAndScoreBuilder {
    foodInformation: FoodInformation;
    personalMatch?: number | null;
    fitsDiet?: boolean;
    fitsTarget?: boolean;
    recommendation?: Meal[];
}

export class FoodAndScore {
    personalMatch: number | null;
    foodInformation: FoodInformation;
    fitsDiet: boolean;
    fitsTarget: boolean;
    recommendation: Meal[];

    public static fromObject(builder: FoodAndScoreBuilder): FoodAndScore {
        const data = new FoodAndScore();
        data.personalMatch = builder.personalMatch || null;
        data.foodInformation = builder.foodInformation;
        data.fitsDiet = builder.fitsDiet || false;
        data.fitsTarget = builder.fitsTarget || false;
        data.recommendation = builder.recommendation || [];
        return data;
    }
}
