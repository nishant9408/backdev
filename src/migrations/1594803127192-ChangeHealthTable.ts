import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeHealthTable1594803127192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const deleteDataColumn = 'ALTER TABLE health DROP COLUMN data;';
        const addColumns = `
        ALTER TABLE health
            ADD date_of_birth VARCHAR(100) NOT NULL,
            ADD gender gender_type NOT NULL,
            ADD step_count INTEGER NOT NULL,
            ADD workout_count INTEGER NOT NULL
        `;

        await queryRunner.query(deleteDataColumn);
        await queryRunner.query(addColumns);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
