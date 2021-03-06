import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddFields1604652029943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const changes = `
            ALTER TABLE users
            ADD COLUMN timezone VARCHAR(50),
            ADD COLUMN notification_token VARCHAR(255);
            ADD COLUMN healthCondition VARCHAR(50),
            ADD COLUMN region VARCHAR(50),
            ADD COLUMN country VARCHAR(50)`;

        const deleteFields = `
            ALTER TABLE health_provider
            DROP COLUMN device_id;`;

        const addFields = `
            ALTER TABLE health_provider
            ADD COLUMN u_id bigint;`;

        await queryRunner.query(addFields);
        await queryRunner.query(deleteFields);
        await queryRunner.query(changes);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
