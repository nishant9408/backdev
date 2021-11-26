import { BadRequestException, Injectable } from '@nestjs/common';
import { Health } from '../../core/data/Health';
import { HealthProvider } from '../../core/data/HealthProvider';
import { HealthProviderName } from '../../core/data/HealthProviderName';
import { SaveDailyScoreParamsDTO } from '../../core/DTO/SaveDailyScoreParamsDTO';
import { HealthProviderPort } from '../../core/ports/HealthProviderPort';
import { FitbitClient } from './FitbitClient';

@Injectable()
export class HealthDataProviderAdapter implements HealthProviderPort {
    constructor(
        private readonly fitbit: FitbitClient,
    ) { }

    public async subscribeOnActivities(data: HealthProvider): Promise<void> {
        switch (data.name) {
            case HealthProviderName.FITBIT:
                // await this.fitbit.subscribeOnActivities(data);
                break;
            default:
                break;
        }
    }

    public async getHealthData(data: HealthProvider): Promise<{ health: Health, timezone: string }> {
        let healthData;

        switch (data.name) {
            case HealthProviderName.FITBIT: {
                if (!data.accessToken || !data.refreshToken || !data.userId) {
                    throw new BadRequestException('Provider auth data required');
                }
                healthData = await this.fitbit.getUserData(data.accessToken, data.timezone!);
                break;
            }
            default:
                healthData = Object(null);
        }

        return {
            health: Health.fromObject({
                userId: data.userId,
                ...healthData,
            }),
            timezone: healthData.timezone,
        };
    }

    public async isAccessTokenValid(data: HealthProvider): Promise<boolean> {
        switch (data.name) {
            case HealthProviderName.FITBIT:
                return await this.fitbit.isAccessTokenValid(data.accessToken!);
            default:
                return true;
        }
    }

    public async refreshToken(data: HealthProvider): Promise<HealthProvider> {
        switch (data.name) {
            case HealthProviderName.FITBIT: {
                const refreshed = await this.fitbit.refreshAccessToken(data);
                const updated = HealthProvider.fromObject({
                    ...data,
                    ...refreshed,
                });
                return updated;
            }
            default: {
                return data;
            }
        }
    }

    public async getTodayLastActivity(data: HealthProvider): Promise<any | null> {
        switch (data.name) {
            case HealthProviderName.FITBIT: {
                const result = await this.fitbit.getDailyActivities(data.uId!, data.accessToken!);

                const activities = result.activities;

                if (!activities?.length) return null;

                return activities[ activities.length - 1 ];
            }
            default: {
                return null;
            }
        }
    }

    public async getDailyStats(data: HealthProvider): Promise<SaveDailyScoreParamsDTO | null> {
        switch (data.name) {
            case HealthProviderName.FITBIT: {
                return await this.fitbit.getDailyStats(data.accessToken!, data.timezone!);
            }
            default: {
                return null;
            }
        }
    }

}
