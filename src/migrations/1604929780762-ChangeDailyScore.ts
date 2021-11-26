import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDailyScore1604929780762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const changesAdd = `
            ALTER TABLE daily_score
            ADD COLUMN IF NOT EXISTS user_id bigint`;

        const changesRemove = `
            ALTER TABLE daily_score
            DROP COLUMN IF EXISTS device_id;`;

        await queryRunner.query(changesAdd);
        await queryRunner.query(changesRemove);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
