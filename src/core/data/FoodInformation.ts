import { FoodScore } from './FoodScore';

interface FoodInformationBuilder {
    nutritionScore: FoodScore | null;
    productName: string | null;
    images: {
        large: string | null;
        medium: string | null;
        small: string | null;
    };
    basicCategory: string | null;
}

export class FoodInformation {
    nutritionScore: FoodScore | null;
    productName: string | null;
    images: {
        large: string | null;
        medium: string | null;
        small: string | null;
    };
    basicCategory: string | null;

    public static fromObject(builder: FoodInformationBuilder): FoodInformation {
        const data = new FoodInformation();
        data.nutritionScore = builder.nutritionScore;
        data.productName = builder.productName;
        data.images = builder.images;
        data.basicCategory = builder.basicCategory;
        return data;
    }
}
