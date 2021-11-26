import { ApiProperty } from '@nestjs/swagger';

interface MealOutputBuilder {
    id: number;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    ingredients: string[];
    portion: number | null;
}

export class MealOutput {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: Number })
    calories: number;

    @ApiProperty({ type: Number })
    proteins: number;

    @ApiProperty({ type: Number })
    fats: number;

    @ApiProperty({ type: Number })
    carbs: number;

    @ApiProperty({ type: String, isArray: true })
    ingredients: string[];

    @ApiProperty({ type: Number, nullable: true })
    portion: number | null;

    public static fromObject(builder: MealOutputBuilder): MealOutput {
        const meal = new MealOutput();
        meal.id = builder.id;
        meal.name = builder.name;
        meal.calories = builder.calories;
        meal.proteins = builder.proteins;
        meal.fats = builder.fats;
        meal.carbs = builder.carbs;
        meal.ingredients = builder.ingredients;
        meal.portion = builder.portion;
        return meal;
    }
}
