import { FoodTime } from '../data/FoodTime';
import { Health } from '../data/Health';

export interface ProvideRecommendationDTO {
    healthData: Health;
    foodTime?: FoodTime;
}
