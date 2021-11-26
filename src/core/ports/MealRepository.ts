import { Diet } from '../data/Diet';
import { Meal } from '../data/Meal';

export interface MealRepository {
    getMealsByDiet(diets: Diet[]): Promise<Meal[]>;
}

const MealRepositoryType = Symbol.for('MealRepository');
export { MealRepositoryType };
