import { ActivityLevel } from './ActivityLevel';
import { AgeRange } from './AgeRange';
import { FoodTime } from './FoodTime';
import { GenderType } from './GenderType';

export interface RecommendationBuilder {
    id?: string | null;
    categories: string[];
    activityLevel: ActivityLevel;
    time: FoodTime;
    age: AgeRange;
    gender: GenderType;
}

export class Recommendation {
    id: string | null;
    categories: string[];
    activityLevel: ActivityLevel;
    time: FoodTime;
    age: AgeRange;
    gender: GenderType;

    public static fromObject(builder: RecommendationBuilder): Recommendation {
        const data = new Recommendation();
        data.id = builder.id || null;
        data.activityLevel = builder.activityLevel;
        data.categories = builder.categories;
        data.time = builder.time;
        data.age = builder.age;
        data.gender = builder.gender;
        return data;
    }
}
