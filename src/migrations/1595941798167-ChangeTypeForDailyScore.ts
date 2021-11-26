import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTypeForDailyScore1595941798167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const querySleep = 'ALTER TABLE daily_score ALTER COLUMN sleep TYPE bigint USING sleep::bigint;';
        const queryHeartRate = 'ALTER TABLE daily_score ALTER COLUMN heart_rate TYPE bigint USING heart_rate::bigint;';
        const queryRestingHeartRate = 'ALTER TABLE daily_score ALTER COLUMN resting_heart_rate TYPE bigint USING resting_heart_rate::bigint;';
        const querySteps = 'ALTER TABLE daily_score ALTER COLUMN steps TYPE bigint USING steps::bigint;';
        const queryCalories = 'ALTER TABLE daily_score ALTER COLUMN calories TYPE bigint USING calories::bigint;';
        const queryLightWorkout = 'ALTER TABLE daily_score ALTER COLUMN light_workout TYPE bigint USING light_workout::bigint;';
        const queryModerateWorkout = 'ALTER TABLE daily_score ALTER COLUMN moderate_workout TYPE bigint USING moderate_workout::bigint;';
        const queryHardWorkout = 'ALTER TABLE daily_score ALTER COLUMN hard_workout TYPE bigint USING hard_workout::bigint;';
        const queryTotalActivity = 'ALTER TABLE daily_score ALTER COLUMN total_activity TYPE bigint USING total_activity::bigint;';

        await queryRunner.query(querySleep);
        await queryRunner.query(queryLightWorkout);
        await queryRunner.query(queryModerateWorkout);
        await queryRunner.query(queryHeartRate);
        await queryRunner.query(queryRestingHeartRate);
        await queryRunner.query(querySteps);
        await queryRunner.query(queryCalories);
        await queryRunner.query(queryHardWorkout);
        await queryRunner.query(queryTotalActivity);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
