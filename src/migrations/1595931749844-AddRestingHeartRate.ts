import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRestingHeartRate1595931749844 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addColumns = `
            ALTER TABLE daily_score
            ADD COLUMN resting_heart_rate INTEGER DEFAULT NULL
        ;`;

        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
