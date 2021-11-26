import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlertToDailyScore1605542637907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            ALTER TABLE daily_score
            ADD COLUMN alert TEXT;`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
