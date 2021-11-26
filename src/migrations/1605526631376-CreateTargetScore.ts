import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTargetScore1605526631376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS target_score (
            id BIGSERIAL PRIMARY KEY,
            user_id BIGSERIAL NOT NULL,
            plan_score INTEGER NOT NULL,
            target_score DOUBLE PRECISION NOT NULL,
            monthly_score DOUBLE PRECISION NOT NULL,
            average_calories DOUBLE PRECISION NOT NULL,
            plan_calories DOUBLE PRECISION NOT NULL,
            average_activity BIGSERIAL NOT NULL,
            plan_activity BIGSERIAL NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP DEFAULT NULL
          );`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
