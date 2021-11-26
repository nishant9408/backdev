import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveConstraint1604662693547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const changes = `
            ALTER TABLE daily_score
            DROP CONSTRAINT daily_score_device_id_fkey;`;

        await queryRunner.query(changes);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
