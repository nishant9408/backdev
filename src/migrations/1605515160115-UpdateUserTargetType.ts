import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTargetType1605515160115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            ALTER TABLE users
            ALTER COLUMN weight_loss_intensity TYPE DOUBLE PRECISION`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
