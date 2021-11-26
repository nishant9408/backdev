import { GenderType } from '../data/GenderType';
import { WeightMode } from '../usecases/GenerateDailyScore';

export interface CalculateDailyScoreDTO {
    sleep: number | null;
    steps: number | null;
    restingHeartRate: number | null;
    lightWorkout: number | null;
    moderateWorkout: number | null;
    hardWorkout: number | null;
    totalActivity: number | null;
    gender: GenderType;
    age: number;
    mode: WeightMode;
}
