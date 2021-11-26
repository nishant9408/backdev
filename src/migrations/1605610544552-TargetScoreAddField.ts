import { MigrationInterface, QueryRunner } from 'typeorm';

export class TargetScoreAddField1605610544552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            ALTER TABLE target_score
            ADD COLUMN recommendations TEXT[] DEFAULT '{}'`;

        await queryRunner.query(query);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
