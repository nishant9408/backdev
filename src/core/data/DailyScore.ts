interface DailyScoreBuilder {
    id?: string | null;
    userId: number;
    sleep?: number | null;
    steps?: number | null;
    heartRate?: number | null;
    restingHeartRate?: number | null;
    calories?: number | null;
    score?: number | null;
    lightWorkout?: number | null;
    moderateWorkout?: number | null;
    hardWorkout?: number | null;
    recommendations: string[];
    alert?: string | null;
    recommendedCalories: number;
    totalActivity?: number | null;
    createdAt?: Date | null;
}

export class DailyScore {
    id: string | null;
    userId: number;
    sleep: number | null;
    steps: number | null;
    heartRate: number | null;
    alert: string | null;
    calories: number | null;
    restingHeartRate: number | null;
    score: number | null;
    lightWorkout: number | null;
    moderateWorkout: number | null;
    recommendations: string[];
    recommendedCalories: number;
    hardWorkout: number | null;
    totalActivity: number | null;
    createdAt: Date | null;

    public static fromObject(builder: DailyScoreBuilder): DailyScore {
        const data = new DailyScore();
        data.id = builder.id || null;
        data.userId = builder.userId;
        data.alert = builder.alert || null;
        data.score = Number.isInteger(builder.score) ? builder.score! : null;
        data.steps = Number.isInteger(builder.steps) ? builder.steps! : null;
        data.heartRate = Number.isInteger(builder.heartRate) ? builder.heartRate! : null;
        data.restingHeartRate = Number.isInteger(builder.restingHeartRate) ? builder.restingHeartRate! : null;
        data.calories = Number.isInteger(builder.calories) ? builder.calories! : null;
        data.sleep = Number.isInteger(builder.sleep) ? builder.sleep! : null;
        data.recommendations = builder.recommendations;
        data.recommendedCalories = builder.recommendedCalories;
        data.lightWorkout = Number.isInteger(builder.lightWorkout) ? builder.lightWorkout! : null;
        data.moderateWorkout = Number.isInteger(builder.moderateWorkout) ? builder.moderateWorkout! : null;
        data.hardWorkout = Number.isInteger(builder.hardWorkout) ? builder.hardWorkout! : null;
        data.totalActivity = Number.isInteger(builder.totalActivity) ? builder.totalActivity! : null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
