interface TargetScoreBuilder {
    id?: number | null;
    userId: number;
    planScore: number;
    currentScore: number;
    monthlyScore: number;
    period: number;
    averageCalories: number;
    planCalories: number;
    recommendations?: string[];
    averageActivity: number;
    planActivity: number;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export class TargetScore {
    id: number | null;
    userId: number;
    planScore: number;
    currentScore: number;
    recommendations: string[];
    monthlyScore: number;
    period: number;
    averageCalories: number;
    planCalories: number;
    averageActivity: number;
    planActivity: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    
    public static fromObject(builder: TargetScoreBuilder): TargetScore {
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
