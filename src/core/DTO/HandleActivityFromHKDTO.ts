import { Activity } from '../data/Activity';
import { HealthDataDTO } from './HealthDataDTO';

export interface HandleActivityFromHKDTO {
    userId: string;
    activity: Activity;
    healthData: HealthDataDTO;
}
