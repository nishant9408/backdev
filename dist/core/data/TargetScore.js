"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetScore = void 0;
class TargetScore {
    static fromObject(builder) {
        const targetScore = new TargetScore();
        targetScore.id = builder.id || null;
        targetScore.userId = builder.userId;
        targetScore.planScore = builder.planScore;
        targetScore.recommendations = builder.recommendations || [];
        targetScore.period = builder.period;
        targetScore.currentScore = builder.currentScore;
        targetScore.monthlyScore = builder.monthlyScore;
        targetScore.averageCalories = builder.averageCalories;
        targetScore.planCalories = builder.planCalories;
        targetScore.averageActivity = builder.averageActivity;
        targetScore.planActivity = builder.planActivity;
        targetScore.createdAt = builder.createdAt || null;
        targetScore.updatedAt = builder.updatedAt || null;
        targetScore.deletedAt = builder.deletedAt || null;
        return targetScore;
    }
}
exports.TargetScore = TargetScore;
//# sourceMappingURL=TargetScore.js.map