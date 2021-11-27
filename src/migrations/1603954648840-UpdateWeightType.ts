import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateWeightType1603954648840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const changeType = `
            ALTER TABLE users
            ADD COLUMN location VARCHAR(100) DEFAULT NULL,
            ADD COLUMN region VARCHAR(100) DEFAULT NULL,
            ADD COLUMN health_condition VARCHAR(100) DEFAULT NULL,
            ALTER COLUMN weight TYPE DOUBLE PRECISION,
            ALTER COLUMN height TYPE DOUBLE PRECISION,
            ALTER COLUMN target_weight TYPE DOUBLE PRECISION`;

        await queryRunner.query(changeType);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
