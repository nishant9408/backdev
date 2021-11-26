import { DailyScore } from '../data/DailyScore';

export interface DailyScoreRepository {
    saveDailyScore(data: DailyScore): Promise<DailyScore>;
    getDailyScoreByUserId(userId: number): Promise<DailyScore | null>;
    getTwoDailyScoreByUserId(userId: number): Promise<DailyScore[]>;
    getDailyForPeriod(userId: number, since?: Date): Promise<DailyScore[]>;
}
