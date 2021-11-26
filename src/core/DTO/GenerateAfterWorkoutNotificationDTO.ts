import { HealthProvider } from '../data/HealthProvider';

export interface GenerateAfterWorkoutNotificationDTO {
    providerData: HealthProvider;
    calories: number;
}
