import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailField1596101656533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addColumns = `
            ALTER TABLE device
            ADD COLUMN email VARCHAR(100) DEFAULT NULL
        ;`;

        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
