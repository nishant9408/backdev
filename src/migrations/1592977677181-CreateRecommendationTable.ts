import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecommendationTable1592977677181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addEnumFoodTime = `
            CREATE TYPE food_time AS ENUM ('breakfast', 'first_snack', 'lunch', 'second_snack', 'dinner');`;

        const addEnumActivityLevel = `
            CREATE TYPE activity_level AS ENUM ('low', 'medium', 'high');`;

        const addEnumGenderTypes = `
            CREATE TYPE gender_type AS ENUM ('male', 'female');`;

        const createRecommendationTableSQL = `
        CREATE TABLE recommendation (
            id BIGSERIAL PRIMARY KEY,
            categories text[] NOT NULL,
            activity_level activity_level NOT NULL,
            time food_time NOT NULL,
            age int[],
            gender gender_type
        );`;

        await queryRunner.query(addEnumFoodTime);
        await queryRunner.query(addEnumActivityLevel);
        await queryRunner.query(addEnumGenderTypes);
        await queryRunner.query(createRecommendationTableSQL);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
