import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatFoodEnum1605265795596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const addEnumType = `
            CREATE TYPE food_type AS ENUM ('fish', 'eggs', 'milk');`;

        await queryRunner.query(addEnumType);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
