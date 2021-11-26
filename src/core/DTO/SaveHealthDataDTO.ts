import { GenderType } from '../data/GenderType';

export interface SaveHealthDataDTO {
    userId: string;
    dateOfBirth: string | null;
    gender: GenderType | null;
    email?: string | null;
    stepCount: number;
    workoutCount: number;
}
