import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMailingFlag1596111375333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addColumns = `
            ALTER TABLE device
            ADD COLUMN allow_mailing BOOLEAN DEFAULT FALSE
        ;`;

        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
