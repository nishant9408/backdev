import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimeZoneField1592459157598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addTimeZone = `
            ALTER TABLE device
            ADD COLUMN timezone VARCHAR(50);`
        ;

        await queryRunner.query(addTimeZone);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
