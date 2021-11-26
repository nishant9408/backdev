import { Health } from '../data/Health';

export interface HealthRepository {
    findHealthData(userId: string): Promise<Health | null>;
    saveHealthData(data: Health): Promise<Health>;
}
