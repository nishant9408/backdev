import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDailyScoreTable1594373696570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const createDailyScoreSQL = `
        CREATE TABLE daily_score (
            id BIGSERIAL PRIMARY KEY,
            device_id VARCHAR(255),
            sleep INTEGER DEFAULT NULL,
            heart_rate INTEGER DEFAULT NULL,
            steps INTEGER DEFAULT NULL,
            calories INTEGER DEFAULT NULL,
            score INTEGER DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (device_id) REFERENCES device(device_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
        );`;

        await queryRunner.query(createDailyScoreSQL);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
