import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { request, RequestOptions } from 'https';
import * as moment from 'moment';
import * as queryString from 'query-string';
import config from '../../configuration/config/Config';
import logger from '../../configuration/Logger';
import { GenderType } from '../../core/data/GenderType';
import { HealthProvider } from '../../core/data/HealthProvider';
import { FitbitAuth } from './data/FitbitAuth';

@Injectable()
export class FitbitClient {

    public async getDailyActivities(userId: number, token: string): Promise<any> {
        const options = {
            hostname: 'api.fitbit.com',
            path: `/1/user/${userId}/activities/date/today.json`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.makeRequest(options);
    }

    // public async subscribeOnActivities(data: HealthProvider): Promise<void> {
    //     const subscriberId = config.fitbit.subscriberId;
    //     const subscriptionId = `${subscriberId}-${data.userId}`;
    //
    //     const options: RequestOptions = {
    //         hostname: 'api.fitbit.com',
    //         path: `/1/user/${data.userId}/activities/apiSubscriptions/${subscriptionId}.json`,
    //         headers: {
    //             Authorization: `${data.tokenType} ${data.accessToken}`,
    //             ['Content-Type']: 'application/json',
    //             ['X-Fitbit-Subscriber-Id']: `${subscriberId}`,
    //         },
    //         method: 'POST',
    //     };
    //
    //     const res = await this.makeRequest(options);
    //     logger.info({ userId: data.userId, userId: data.userId, ...res }, 'subscription');
    // }

    public async isAccessTokenValid(accessToken: string): Promise<boolean> {
        const options = {
            hostname: 'api.fitbit.com',
            path: '/1.1/oauth2/introspect',
            method: 'POST',
            headers: {
               Authorization: 'Bearer ' + accessToken,
                ['Content-Type']: 'application/x-www-form-urlencoded',
            },
        };

        const body = queryString.stringify({ token: accessToken });

        const result: any = await this.makeRequest(options, body);

        if (result['error']) {
            throw new InternalServerErrorException('fitbit problems');
        }

        return result['active'] || false;
    }

    public async refreshAccessToken(data: HealthProvider): Promise<FitbitAuth> {
        logger.info({
            message: 'Starting',
            method: 'refreshAccessToken',
            data,
        });
        const strToEncode = `${config.fitbit.clientId}:${config.fitbit.clientSecret}`;
        const buff = Buffer.from(strToEncode);
        const base64data = buff.toString('base64');

        const options = {
            hostname: 'api.fitbit.com',
            path: `/oauth2/token?grant_type=refresh_token&refresh_token=${data.refreshToken}`,
            method: 'POST',
            headers: {
                Authorization: `Basic ${base64data}`,
                ['Content-Type']: 'application/x-www-form-urlencoded',
            },
        };

        const result = await this.makeRequest(options);
        logger.info({
            message: 'Result',
            result,
            method: 'refreshAccessToken',
            data,
        });

        return FitbitAuth.fromObject(result);
    }

    public async getUserData(accessToken: string, timezone: string) {
        const profileData = await this.getProfileData(accessToken);

        const data = await Promise.all([
            this.getActivities(accessToken, profileData.timezone || timezone),
            this.getSteps(accessToken, profileData.timezone || timezone),
        ]);

        const res = data
            .filter(obj => !obj['error'])
            .reduce((acc, val) => ({
                ...acc, ...val,
            }), { });

        return {
            timezone: profileData.user.timezone,
            dateOfBirth: profileData.user.dateOfBirth,
            gender: profileData.user.gender === 'MALE' ? GenderType.MALE : GenderType.FEMALE,
            workoutCount: res.activities.length,
            stepCount: res['activities-steps'].reduce((acc, v) => acc + parseInt(v['value'], 10), 0),
        };
    }

    public async getProfileData(token: string): Promise<any> {
        const options = {
            hostname: 'api.fitbit.com',
            path: '/1/user/-/profile.json',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.makeRequest(options);
    }

    public async getDailyStats(accessToken: string, timezone: string): Promise<any> {
        const daysToSubtract = 1;
        const date = this.generateDateForActivity(daysToSubtract, timezone);

        const responses = await Promise.all([
            this.getStepsAndCaloriesForSpecifiedDate(accessToken, date),
            this.getSleepForSpecifiedDate(accessToken, date),
            this.getHeartRateForSpecifiedDate(accessToken, date),
        ]);

        return responses.reduce((acc, obj) => ({ ...acc, ...obj }), { });
    }

    private async getSleepForSpecifiedDate(token: string, date: string): Promise<any> {
        const options = {
            hostname: 'api.fitbit.com',
            path: `/1/user/-/sleep/date/${date}.json`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // https://dev.fitbit.com/build/reference/web-api/sleep/
        const data = await this.makeRequest(options);
        const sleepInMilliseconds = data.summary.totalMinutesAsleep !== undefined ?
            Math.round(data.summary.totalMinutesAsleep) * 60 * 1000 :
            null;

        return {
            sleep: sleepInMilliseconds,
        };
    }

    private async getHeartRateForSpecifiedDate(token: string, date: string): Promise<any> {
        const options = {
            hostname: 'api.fitbit.com',
            path: `/1/user/-/activities/heart/date/${date}/1d.json`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // https://dev.fitbit.com/build/reference/web-api/heart-rate/
        const data: any[] | any = await this.makeRequest(options);
        if (data.errors) {
            logger.info({ token, data, method: 'getHeartRateForSpecifiedDate' });
            throw new InternalServerErrorException(data.errors);
        }

        const zones = data?.['activities-heart'][0]?.value?.heartRateZones || null;
        if (!zones) throw new InternalServerErrorException('getHeartRateForSpecifiedDate error: zones == null');
        const min1 = 60 * 1000;
        const lightWorkout = min1 * zones[1].minutes || 0;
        const moderateWorkout = min1 * zones[2].minutes || 0;
        const hardWorkout = min1 * zones[3].minutes || 0;
        const restingHeartRate = data['activities-heart'][0]?.value.restingHeartRate || 0;
        const heartRate = this.calculateHeartRate(data);
        return {
            lightWorkout,
            moderateWorkout,
            hardWorkout,
            heartRate,
            restingHeartRate,
        };
    }

    private calculateHeartRate(data): number {
        const zones: any[] = data?.['activities-heart'][0]?.value?.heartRateZones || null;
        if (!zones) return 0;
        let commonRate = 0;
        let commonTimeInMin = 0;
        for (const zone of zones) {
            commonRate += Math.round((zone.min + zone.max) / 2 * zone.minutes) || 0;
            commonTimeInMin += zone.minutes || 0;
        }
        const averageHeartRate = Math.round(commonRate / commonTimeInMin);
        return averageHeartRate || 0;
    }

    private async getStepsAndCaloriesForSpecifiedDate(token: string, date: string): Promise<any> {
        const options = {
            hostname: 'api.fitbit.com',
            path: `/1/user/-/activities/date/${date}.json`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const min1 = 60 * 1000;

        // https://dev.fitbit.com/build/reference/web-api/activity/
        const data = await this.makeRequest(options);
        const summary = data.summary;
        const totalActivity = (summary?.fairlyActiveMinutes || 0) + (summary?.veryActiveMinutes || 0);
        return {
            calories: summary?.caloriesOut || 0,
            steps: summary?.steps || 0,
            totalActivity: totalActivity * min1,
        };
    }

    private async getSteps(token: string, timezone: string): Promise<any> {
        const days = 3;
        const afterDate = this.generateDateForActivity(days, timezone);
        const options = {
            hostname: 'api.fitbit.com',
            path: `/1/user/-/activities/steps/date/today/${afterDate}.json`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.makeRequest(options);
    }

    private async getActivities(token: string, timezone: string): Promise<any> {
        const days = 7;
        const afterDate = this.generateDateForActivity(days, timezone);

        const offset = 0;
        const limit = 2;
        const sort = 'desc';

        const options = {
            hostname: 'api.fitbit.com',
            path: `/1/user/-/activities/list.json?afterDate=${afterDate}&offset=${offset}&limit=${limit}&sort=${sort}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const data = await this.makeRequest(options);

        return { activities: data['activities'] };
    }

    private generateDateForActivity(days: number, timezone: string): string {
        const date = moment.tz(new Date(), timezone).subtract(days, 'days');

        return date.format('YYYY-MM-DD');
    }

    private async makeRequest(options: RequestOptions, body: any = null): Promise<any> {
        return await new Promise((resolve, reject) => {
            const req = request(options, resp => {
                let data = '';
                resp.on('data', chunk => data += chunk);
                resp.on('end', () => resolve(JSON.parse(data)));
            }).on('error', e => reject(e));

            if (body) req.write(body);
            req.end();
        });
    }
}
