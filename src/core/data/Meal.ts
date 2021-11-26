export interface MealBuilder {
    id: number;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    ingredients: string[];
    portion?: number | null;
}

export class Meal {
    id: number;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    ingredients: string[];
    portion: number | null;

    public static fromObject(builder: MealBuilder): Meal {
        const meal = new Meal();
        meal.id = builder.id;
        meal.name = builder.name;
        meal.portion = builder.portion || null;
        meal.calories = builder.calories;
        meal.proteins = builder.proteins;
        meal.fats = builder.fats;
        meal.carbs = builder.carbs;
        meal.ingredients = builder.ingredients;
        return meal;
    }
}
