import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyProviderTable1594812102505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addColumns = `
        ALTER TABLE health_provider
            ADD timezone VARCHAR(50)
        ;`;

        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
