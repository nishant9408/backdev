import { MigrationInterface, QueryRunner } from 'typeorm';

export class Subscription1597821017025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            CREATE TABLE samsung_subscriber (
            id BIGSERIAL PRIMARY KEY,
            email VARCHAR(255),
            created_at TIMESTAMP DEFAULT NOW()
        );`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
