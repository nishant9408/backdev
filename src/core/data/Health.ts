import { GenderType } from './GenderType';

export interface HealthBuilder {
    id?: string | null;
    userId: string;
    dateOfBirth: string;
    gender: GenderType;
    stepCount: number;
    workoutCount: number;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}

export class Health {
    id: string | null;
    userId: string;
    dateOfBirth: string;
    gender: GenderType;
    stepCount: number;
    workoutCount: number;
    updatedAt: Date | null;
    createdAt: Date | null;

    public static fromObject(builder: HealthBuilder): Health {
        const data = new Health();
        data.id = builder.id || null;
        data.userId = builder.userId;
        data.dateOfBirth = builder.dateOfBirth;
        data.gender = builder.gender;
        data.stepCount = builder.stepCount;
        data.workoutCount = builder.workoutCount;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
