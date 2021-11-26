"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTypeForDailyScore1595941798167 = void 0;
class ChangeTypeForDailyScore1595941798167 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySleep = 'ALTER TABLE daily_score ALTER COLUMN sleep TYPE bigint USING sleep::bigint;';
            const queryHeartRate = 'ALTER TABLE daily_score ALTER COLUMN heart_rate TYPE bigint USING heart_rate::bigint;';
            const queryRestingHeartRate = 'ALTER TABLE daily_score ALTER COLUMN resting_heart_rate TYPE bigint USING resting_heart_rate::bigint;';
            const querySteps = 'ALTER TABLE daily_score ALTER COLUMN steps TYPE bigint USING steps::bigint;';
            const queryCalories = 'ALTER TABLE daily_score ALTER COLUMN calories TYPE bigint USING calories::bigint;';
            const queryLightWorkout = 'ALTER TABLE daily_score ALTER COLUMN light_workout TYPE bigint USING light_workout::bigint;';
            const queryModerateWorkout = 'ALTER TABLE daily_score ALTER COLUMN moderate_workout TYPE bigint USING moderate_workout::bigint;';
            const queryHardWorkout = 'ALTER TABLE daily_score ALTER COLUMN hard_workout TYPE bigint USING hard_workout::bigint;';
            const queryTotalActivity = 'ALTER TABLE daily_score ALTER COLUMN total_activity TYPE bigint USING total_activity::bigint;';
            yield queryRunner.query(querySleep);
            yield queryRunner.query(queryLightWorkout);
            yield queryRunner.query(queryModerateWorkout);
            yield queryRunner.query(queryHeartRate);
            yield queryRunner.query(queryRestingHeartRate);
            yield queryRunner.query(querySteps);
            yield queryRunner.query(queryCalories);
            yield queryRunner.query(queryHardWorkout);
            yield queryRunner.query(queryTotalActivity);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.ChangeTypeForDailyScore1595941798167 = ChangeTypeForDailyScore1595941798167;
//# sourceMappingURL=1595941798167-ChangeTypeForDailyScore.js.map