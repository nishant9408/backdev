import { HealthProvider } from '../data/HealthProvider';

export interface HealthProviderRepository {
    getHealthKitProviders(): Promise<HealthProvider[]>;
    getHealthProviderDataByUserId(userId: number): Promise<HealthProvider | null>;
    saveHealthProviderData(data: HealthProvider): Promise<HealthProvider>;
    getFitbitProviders(): Promise<HealthProvider[]>;
}
