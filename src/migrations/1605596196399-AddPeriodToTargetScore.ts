import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPeriodToTargetScore1605596196399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            ALTER TABLE target_score
            ADD COLUMN period INTEGER DEFAULT 1;`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
