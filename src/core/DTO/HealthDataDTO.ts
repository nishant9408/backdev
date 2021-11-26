import { GenderType } from '../data/GenderType';

export interface HealthDataDTO {
    dateOfBirth: string | null;
    gender: GenderType | null;
    stepCount: number;
    workoutCount: number;
}
