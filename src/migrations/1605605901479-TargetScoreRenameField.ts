import { MigrationInterface, QueryRunner } from 'typeorm';

export class TargetScoreRenameField1605605901479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            ALTER TABLE target_score
            RENAME COLUMN target_score TO current_score;`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
