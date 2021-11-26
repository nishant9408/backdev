import { MigrationInterface, QueryRunner } from 'typeorm';
import { dietParser } from '../diets/dietParser';

export class RecommendationsParser1604997771759 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const rows = await dietParser([
            'ketodiet.csv',
            'gluten_free.csv',
            'balanced.csv',
            'vegan.csv',
            'vegetarian_with_eggs.csv',
            'vegetarian_with_fish.csv',
            'vegetarian_with_milk.csv',
        ]);

        const add = `
            INSERT INTO meals (name, calories, proteins, fats, carbs, diet, ingredients)
            VALUES ${rows};`;

        await queryRunner.query(add);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
