import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDailyScore1605515413680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            ALTER TABLE daily_score
            ADD COLUMN recommendations TEXT[],
            ADD COLUMN recommended_calories DOUBLE PRECISION;
        `;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
