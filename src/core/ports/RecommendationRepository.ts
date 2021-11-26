import { ActivityLevel } from '../data/ActivityLevel';
import { AgeRange } from '../data/AgeRange';
import { FoodTime } from '../data/FoodTime';
import { GenderType } from '../data/GenderType';
import { Recommendation } from '../data/Recommendation';

export interface RecommendationRepository {
    findRecommendations(activityLevel: ActivityLevel, age?: AgeRange, time?: FoodTime, gender?: GenderType): Promise<Recommendation[]>;
    findRecommendation(activityLevel: ActivityLevel, age: AgeRange, time: FoodTime, gender: GenderType): Promise<Recommendation | null>;
}
