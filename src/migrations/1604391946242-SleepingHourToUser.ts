import { MigrationInterface, QueryRunner } from 'typeorm';

export class SleepingHourToUser1604391946242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const changeType = `
            ALTER TABLE users
            ADD COLUMN average_sleeping_time DOUBLE PRECISION NOT NULL DEFAULT 7;`;

        await queryRunner.query(changeType);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
