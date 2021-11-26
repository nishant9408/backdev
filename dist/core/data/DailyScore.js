"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyScore = void 0;
class DailyScore {
    static fromObject(builder) {
        const data = new DailyScore();
        data.id = builder.id || null;
        data.userId = builder.userId;
        data.alert = builder.alert || null;
        data.score = Number.isInteger(builder.score) ? builder.score : null;
        data.steps = Number.isInteger(builder.steps) ? builder.steps : null;
        data.heartRate = Number.isInteger(builder.heartRate) ? builder.heartRate : null;
        data.restingHeartRate = Number.isInteger(builder.restingHeartRate) ? builder.restingHeartRate : null;
        data.calories = Number.isInteger(builder.calories) ? builder.calories : null;
        data.sleep = Number.isInteger(builder.sleep) ? builder.sleep : null;
        data.recommendations = builder.recommendations;
        data.recommendedCalories = builder.recommendedCalories;
        data.lightWorkout = Number.isInteger(builder.lightWorkout) ? builder.lightWorkout : null;
        data.moderateWorkout = Number.isInteger(builder.moderateWorkout) ? builder.moderateWorkout : null;
        data.hardWorkout = Number.isInteger(builder.hardWorkout) ? builder.hardWorkout : null;
        data.totalActivity = Number.isInteger(builder.totalActivity) ? builder.totalActivity : null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
exports.DailyScore = DailyScore;
//# sourceMappingURL=DailyScore.js.map