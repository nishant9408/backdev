export interface SaveDailyScoreParamsDTO {
    userId: number;
    sleep: number | null;
    steps: number | null;
    heartRate: number | null;
    restingHeartRate: number | null;
    calories: number | null;
    lightWorkout: number | null;
    moderateWorkout: number | null;
    hardWorkout: number | null;
    totalActivity: number | null;
}
