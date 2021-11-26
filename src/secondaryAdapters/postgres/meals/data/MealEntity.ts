import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Diet } from '../../../../core/data/Diet';

interface MealEntityBuilder {
    id: number;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    diet: Diet;
    ingredients: string[];
}

@Entity({ name: 'meals' })
export class MealEntity {
    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'calories' })
    calories: number;

    @Column({ name: 'proteins' })
    proteins: number;

    @Column({ name: 'fats' })
    fats: number;

    @Column({ name: 'diet' })
    diet: Diet;

    @Column({ name: 'carbs' })
    carbs: number;

    @Column('simple-array', { name: 'ingredients' })
    ingredients: string[];

    public static fromObject(builder: MealEntityBuilder): MealEntity {
        const entity = new MealEntity();
        entity.id = builder.id;
        entity.name = builder.name;
        entity.calories = builder.calories;
        entity.proteins = builder.proteins;
        entity.fats = builder.fats;
        entity.carbs = builder.carbs;
        entity.ingredients = builder.ingredients;
        return entity;
    }
}
