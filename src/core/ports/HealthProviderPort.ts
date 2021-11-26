import { Health } from '../data/Health';
import { HealthProvider } from '../data/HealthProvider';
import { SaveDailyScoreParamsDTO } from '../DTO/SaveDailyScoreParamsDTO';

export interface HealthProviderPort {
    getHealthData(data: HealthProvider): Promise<{ health: Health, timezone: string }>;
    isAccessTokenValid(data: HealthProvider): Promise<boolean>;
    refreshToken(data: HealthProvider): Promise<HealthProvider>;
    getTodayLastActivity(data: HealthProvider): Promise<any | null>;
    subscribeOnActivities(data: HealthProvider): Promise<void>;
    getDailyStats(data: HealthProvider): Promise<SaveDailyScoreParamsDTO | null>;
}

const HealthProviderPortType = Symbol.for('HealthProviderPort');
export { HealthProviderPortType };
