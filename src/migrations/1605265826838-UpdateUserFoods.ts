import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserFoods1605265826838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const deleteFields = `
            ALTER TABLE users
            DROP COLUMN IF EXISTS foods;`;

        const addFields = `
            ALTER TABLE users
            ADD COLUMN foods food_type[];`;

        await queryRunner.query(deleteFields);
        await queryRunner.query(addFields);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
