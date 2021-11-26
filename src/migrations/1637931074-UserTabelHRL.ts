import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTabelHRL1637931074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addColumns = `
            ALTER TABLE users
            ADD COLUMN location VARCHAR(100) DEFAULT NULL,
            ADD COLUMN region VARCHAR(100) DEFAULT NULL,
            ADD COLUMN health_condition VARCHAR(100) DEFAULT NULL
        ;`;

        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
