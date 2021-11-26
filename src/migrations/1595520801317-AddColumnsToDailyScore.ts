import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsToDailyScore1595520801317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addColumns = `
            ALTER TABLE daily_score
            ADD COLUMN light_workout INTEGER DEFAULT NULL,
            ADD COLUMN moderate_workout INTEGER DEFAULT NULL,
            ADD COLUMN hard_workout INTEGER DEFAULT NULL,
            ADD COLUMN total_activity INTEGER DEFAULT NULL
        ;`;

        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
