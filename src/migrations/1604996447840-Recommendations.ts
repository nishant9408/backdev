import { MigrationInterface, QueryRunner } from 'typeorm';

export class Recommendations1604996447840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const addEnumType = `
            CREATE TYPE diet_type AS ENUM ('ketodiet', 'gluten free', 'balanced', 'vegan', 'vegetarian', 'vegetarian with fish', 'vegetarian with eggs', 'vegetarian with milk');`;

        const deleteFields = `
            ALTER TABLE users
            DROP COLUMN diet;`;

        const addFields = `
            ALTER TABLE users
            ADD COLUMN diet diet_type;`;

        const newTable = `
        CREATE TABLE meals (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(255),
            calories DOUBLE PRECISION,
            proteins DOUBLE PRECISION,
            fats DOUBLE PRECISION,
            carbs DOUBLE PRECISION,
            ingredients TEXT[],
            diet diet_type
        );`;

        await queryRunner.query(addEnumType);
        await queryRunner.query(deleteFields);
        await queryRunner.query(addFields);
        await queryRunner.query(newTable);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
