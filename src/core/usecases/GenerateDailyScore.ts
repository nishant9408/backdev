import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { DailyScore } from '../data/DailyScore';
import { GenderType } from '../data/GenderType';
import { HealthProviderName } from '../data/HealthProviderName';
import { CalculateDailyScoreDTO } from '../DTO/CalculateDailyScoreDTO';
import { SaveDailyScoreParamsDTO } from '../DTO/SaveDailyScoreParamsDTO';
import { HealthProviderPort, HealthProviderPortType } from '../ports/HealthProviderPort';
import { Repository, RepositoryType } from '../ports/Repository';
import { User } from '../user/domain/data/User';
import { UserRepository, UserRepositoryType } from '../user/port/UserRepository';
import { UpdateProviderInformation } from './UpdateProviderInformation';

export enum WeightMode {
    GAIN = 'gain',
    KEEPING = 'keeping',
    LOSS_1 = 'loss_1',
    LOSS_2 = 'loss_2',
    'LOSS_3.3' = 'loss_3.3',
}

@Injectable()
export class GenerateDailyScore {
    constructor(
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        @Inject(HealthProviderPortType)
        private readonly healthProviderPortAdapter: HealthProviderPort,
        private readonly updateProviderInformation: UpdateProviderInformation,
    ) { }

    public async execute(request: SaveDailyScoreParamsDTO): Promise<DailyScore> {
        let userProvider;
        let user: User | null;
        [ userProvider, user ] = await Promise.all([
            this.repositoryAdapter.getHealthProviderDataByUserId(request.userId),
            this.userRepository.findById(request.userId),
        ]);

        if (!user) {
            throw new InternalServerErrorException('user not found');
        }

        if (!userProvider) {
            throw new InternalServerErrorException('user provider not found');
        }

        let dailyScoreParams = {
            sleep: request.sleep || user.averageSleepingTime,
            steps: request.steps,
            heartRate: request.heartRate,
            lightWorkout: request.lightWorkout,
            moderateWorkout: request.moderateWorkout,
            hardWorkout: request.hardWorkout,
            totalActivity: request.totalActivity,
            restingHeartRate: request.restingHeartRate,
            calories: request.calories,
        };

        if (userProvider.name === HealthProviderName.FITBIT) {
            logger.info({ userId: request.userId, userProvider, message: 'Before update' });
            userProvider = await this.updateProviderInformation.execute(userProvider);
            logger.info({ userId: request.userId, userProvider, message: 'After update' });
            const dataFromProvider = await this.healthProviderPortAdapter.getDailyStats(userProvider);
            logger.info({ userId: request.userId, dataFromProvider });
            dailyScoreParams = {
                sleep: dataFromProvider!.sleep || user.averageSleepingTime,
                steps: dataFromProvider!.steps,
                heartRate: dataFromProvider!.heartRate,
                lightWorkout: dataFromProvider!.lightWorkout,
                moderateWorkout: dataFromProvider!.moderateWorkout,
                hardWorkout: dataFromProvider!.hardWorkout,
                totalActivity: dataFromProvider!.totalActivity,
                calories: dataFromProvider!.calories,
                restingHeartRate: dataFromProvider!.restingHeartRate,
            };
        }

        const mode = this.defineMode(user);
        const [ score, recommendations, alert ] = this.calculateDailyScore({
            ...dailyScoreParams,
            gender: user.gender,
            age: user.age,
            mode,
        });

        const dailyCalories = this.calculateDailyCalories(user, dailyScoreParams.steps);
        recommendations.push(`Recommended calories for today is near ${dailyCalories} kcal.`);
        const isSameDay = this.isSameDay(user.createdAt as Date, new Date());
        let updateScoreBool = false;
        const latestDailyScore = await this.repositoryAdapter.getDailyScoreByUserId(request.userId);
        if (latestDailyScore && this.isSameDay(latestDailyScore.createdAt as Date, new Date())) {
            updateScoreBool = true;
        }
        return await this.repositoryAdapter.saveDailyScore(DailyScore.fromObject({
            ...(updateScoreBool ? latestDailyScore : { }),
            ...dailyScoreParams,
            createdAt: new Date(),
            score,
            alert: !isSameDay ? alert : null,
            userId: user.id as number,
            recommendations,
            recommendedCalories: dailyCalories,
        }));
    }

    private isSameDay(first: Date, second: Date): boolean {
        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDay() === second.getDay();
    }

    private defineMode(user: User): WeightMode {
        if (user.targetWeight > user.weight) return WeightMode.GAIN;
        if (user.targetWeight === user.weight) return WeightMode.KEEPING;
        if (user.weightLossIntensity <= 1) return WeightMode.LOSS_1;
        if (user.weightLossIntensity <= 2) return WeightMode.LOSS_2;
        return WeightMode['LOSS_3.3'];
    }

    private calculateDailyScore(params: CalculateDailyScoreDTO): [ number, string[], string | null ] {
        const { totalActivity, sleep, restingHeartRate, age, gender, lightWorkout, hardWorkout, moderateWorkout, steps, mode } = params;

        const multiplier = 60 * 1000; // minutes => ms

        const activityScore = this.calculateTotalActivity(mode, totalActivity, multiplier);
        const stepsScore = this.calculateSteps(mode, steps);
        const sleepScore = this.calculateSleep(mode, sleep, multiplier);
        const restingScore = this.calculateRestingHeartRate(restingHeartRate, gender, age);
        const hardWorkoutScore = this.calculateHardWorkout(mode, hardWorkout, multiplier);
        const lightWorkoutScore = this.calculateLightWorkout(mode, lightWorkout, multiplier);
        const moderateWorkoutScore = this.calculateModerateWorkout(mode, moderateWorkout, multiplier);

        let recommendations = [
            ...this.activityRecommendations(activityScore),
            ...this.stepsRecommendations(stepsScore),
            ...this.sleepRecommendations(sleepScore),
            ...this.workoutRecommendation(lightWorkoutScore, moderateWorkoutScore, hardWorkoutScore),
        ];

        const scoreCommon = this.calculateScore(
            activityScore,
            stepsScore,
            sleepScore,
            restingScore,
            hardWorkoutScore,
            lightWorkoutScore,
            moderateWorkoutScore,
        );
        const k = 0.4761; // 10/21
        const score = Math.round(scoreCommon * k);

        const targetStatus = `Based on your activity, you are ${ score > 6 ? 'on' : 'off' } your target.`;
        recommendations = [ targetStatus, ...recommendations ];

        const alert = restingScore === 0 &&
            restingHeartRate !== null &&
            restingHeartRate > 0 ? 'Pay attention, your resting heart rate is high, take care.' : null;
        return [ score, recommendations, alert ];
    }

    // Code duplication from ProvideFoodInfoAndScore.ts
    private calculateDailyCalories(user: User, steps: number | null): number {
        if (steps === null) return 0;
        const { gender, height, weight, age, targetWeight } = user;
        const physicalActivity = this.calculatePhysicalActivity(steps);
        const basalMetabolism = this.calculateBasalMetabolism(gender, height, weight, age);
        return Math.round(this.calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, weight, targetWeight));
    }

    private calculatePhysicalActivity(steps: number | null): number {
        if (!steps || steps <= 5000) return 1.2;
        if (steps <= 9999) return 1.3;
        return 1.4;
    }

    private calculateBasalMetabolism(gender: GenderType, height: number, weight: number, age: number): number {
        const k = gender === GenderType.MALE ? v => v + 5 : v => v - 161;
        const bx = k(10 * weight + 6.25 * height + 5 * age);
        return bx;
    }

    private calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, currentWeight, targetWeight: number): number {
        const dailyEnergy = physicalActivity * basalMetabolism;
        if (currentWeight < targetWeight) return dailyEnergy + 0.2 * dailyEnergy;
        if (currentWeight > targetWeight) return Math.max(dailyEnergy - 0.2 * dailyEnergy, basalMetabolism);
        return dailyEnergy;
    }

   // End code duplication

    private calculateScore(...scores: number[]): number {
        return scores.reduce((acc, score) => acc + score, 0);
    }

    private activityRecommendations(score: number): string[] {
        switch (score) {
            case 0: return [ 'To achieve the goal, you need to exercise more.' ];
            case 1: return [ 'Keep your physical activity within 50 - 60 min.' ];
            case 2: return [ 'Increase workout duration by 10 minutes to achieve your target.' ];
            default: return [ ];
        }
    }

    private stepsRecommendations(score: number): string[] {
        switch (score) {
            case 0: return [ 'Walk more, you need to have 5000+ steps passed in a day.' ];
            case 1: return [ 'Go 3000+ steps more for the best result.' ];
            case 2: return [ 'You are almost there, go 1700+ steps more today.' ];
            default: return [ ];
        }
    }

    private sleepRecommendations(score: number): string[] {
        switch (score) {
            case 0: return [ 'Sleep not less that 7 hours.' ];
            case 1: return [ 'Sleep 2 hours more.' ];
            case 2: return [ 'Sleep within 7-8 hours in a day.' ];
            default: return [ ];
        }
    }

    private workoutRecommendation(lightWorkoutScore, moderateWorkoutScore, hardWorkoutScore: number): string[] {
        const start = 'Increase workout time with';
        const recommendations = [
            ...this.lightWorkoutRecommendations(lightWorkoutScore),
            // ...this.moderateWorkoutRecommendations(moderateWorkoutScore),
            // ...this.hardWorkoutRecommendations(hardWorkoutScore),
        ];
        if (!recommendations.length) return [];
        return [ `${start} ${recommendations.join(', ')}.` ];
    }

    private lightWorkoutRecommendations(score: number): string[] {
        switch (score) {
            case 0: return [ 'heart rate of 107-132 to 31-40 minutes' ];
            case 1: return [ 'heart rate of 107-132 to 31-40 minutes' ];
            case 2: return [ 'heart rate of 107-132 by 10 minutes' ];
            default: return [ ];
        }
    }

    // private moderateWorkoutRecommendations(score: number): string[] {
    //     switch (score) {
    //         case 0: return [ 'heart rate of 133-160 to 13-17 minutes' ];
    //         case 1: return [ 'heart rate of 133-160 to 13-17 minutes' ];
    //         case 2: return [ 'heart rate of 133-160 by 5 minutes' ];
    //         default: return [ ];
    //     }
    // }
    //
    // private hardWorkoutRecommendations(score: number): string[] {
    //     switch (score) {
    //         case 0: return [ 'heart rate of 161-200 to 12-15 minutes' ];
    //         case 1: return [ 'heart rate of 161-200 to 12-15 minutes' ];
    //         case 2: return [ 'heart rate of 161-200 by 4 minutes' ];
    //         default: return [ ];
    //     }
    // }

    private calculateTotalActivity(mode: string, totalActivity: number | null, multiplier: number): number {
        if (!totalActivity) return 0;

        const totalActivityInMinutes = totalActivity / multiplier;

        switch (mode) {
            case WeightMode.GAIN: {
                if (totalActivityInMinutes <= 15) return 0;
                else if (totalActivityInMinutes <= 32 || totalActivityInMinutes >= 61) return 1;
                else if (totalActivityInMinutes <= 49) return 2;
                else return 3;
            }
            case WeightMode.KEEPING:
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2:
            case WeightMode['LOSS_3.3']: {
                if (!totalActivityInMinutes || totalActivityInMinutes <= 19) return 0;
                else if (totalActivityInMinutes <= 39) return 1;
                else if (totalActivityInMinutes <= 59) return 2;
                else return 3;
            }
            default: return 0;
        }
    }

    private calculateSteps(mode: string, steps: number | null): number {
        if (!steps) return 0;

        switch (mode) {
            case WeightMode.GAIN: {
                if (steps <= 1599) return 0;
                else if (steps <= 3299) return 1;
                else if (steps <= 4999) return 2;
                else return 3;
            }
            case WeightMode.KEEPING: {
                if (steps <= 1999) return 0;
                else if (steps <= 3999) return 1;
                else if (steps <= 5999) return 2;
                else return 3;
            }
            case WeightMode.LOSS_1: {
                if (steps <= 2299) return 0;
                else if (steps <= 4599) return 1;
                else if (steps <= 6999) return 2;
                else return 3;
            }
            case WeightMode.LOSS_2: {
                if (steps <= 2699) return 0;
                else if (steps <= 5399) return 1;
                else if (steps <= 7999) return 2;
                else return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (steps <= 2999) return 0;
                else if (steps <= 5999) return 1;
                else if (steps <= 8999) return 2;
                else return 3;
            }
            default: return 0;
        }
    }

    private calculateLightWorkout(mode: WeightMode, lightWorkout: number | null, multiplier: number): number {
        if (!lightWorkout) return 0;

        const lightWorkoutInMinutes = lightWorkout / multiplier;

        switch (mode) {
            case WeightMode.GAIN: {
                if (lightWorkoutInMinutes <= 10) return 0;
                else if (lightWorkoutInMinutes <= 20 || lightWorkoutInMinutes >= 41) return 1;
                else if (lightWorkoutInMinutes <= 30) return 2;
                else return 3;
            }
            case WeightMode.KEEPING: {
                if (lightWorkoutInMinutes <= 14) return 0;
                else if (lightWorkoutInMinutes <= 32) return 1;
                else if (lightWorkoutInMinutes <= 49) return 2;
                else return 3;
            }
            case WeightMode.LOSS_1: {
                if (lightWorkoutInMinutes <= 17) return 0;
                else if (lightWorkoutInMinutes <= 35) return 1;
                else if (lightWorkoutInMinutes <= 54) return 2;
                else return 3;
            }
            case WeightMode.LOSS_2: {
                if (lightWorkoutInMinutes <= 19) return 0;
                else if (lightWorkoutInMinutes <= 39) return 1;
                else if (lightWorkoutInMinutes <= 59) return 2;
                else return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (lightWorkoutInMinutes <= 19) return 0;
                else if (lightWorkoutInMinutes <= 39) return 1;
                else if (lightWorkoutInMinutes <= 64) return 2;
                else return 3;
            }
        }
    }

    private calculateModerateWorkout(mode: WeightMode, moderateWorkout: number | null, multiplier: number): number {
        if (!moderateWorkout) return 0;

        const moderateWorkoutInMinutes = moderateWorkout / multiplier;

        switch (mode) {
            case WeightMode.GAIN: {
                if (moderateWorkoutInMinutes <= 4) return 0;
                else if (moderateWorkoutInMinutes <= 9 || moderateWorkoutInMinutes >= 18) return 1;
                else if (moderateWorkoutInMinutes <= 12) return 2;
                else return 3;
            }
            case WeightMode.KEEPING: {
                if (moderateWorkoutInMinutes <= 5) return 0;
                else if (moderateWorkoutInMinutes <= 11) return 1;
                else if (moderateWorkoutInMinutes <= 17) return 2;
                else return 3;
            }
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2: {
                if (moderateWorkoutInMinutes <= 6) return 0;
                else if (moderateWorkoutInMinutes <= 13) return 1;
                else if (moderateWorkoutInMinutes <= 20) return 2;
                else return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (moderateWorkoutInMinutes <= 10) return 0;
                else if (moderateWorkoutInMinutes <= 20) return 1;
                else if (moderateWorkoutInMinutes <= 30) return 2;
                else return 3;
            }
        }
    }

    private calculateHardWorkout(mode: WeightMode, hardWorkout: number | null, multiplier: number): number {
        if (!hardWorkout) return 0;

        const hardWorkoutInMinutes = hardWorkout / multiplier;

        switch (mode) {
            case WeightMode.GAIN: {
                if (hardWorkoutInMinutes <= 4) return 0;
                else if (hardWorkoutInMinutes <= 8 || hardWorkoutInMinutes >= 17) return 1;
                else if (hardWorkoutInMinutes <= 12) return 2;
                else return 3;
            }
            case WeightMode.KEEPING:
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2: {
                if (hardWorkoutInMinutes <= 4) return 0;
                else if (hardWorkoutInMinutes <= 8) return 1;
                else if (hardWorkoutInMinutes <= 12) return 2;
                else return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (hardWorkoutInMinutes <= 4) return 0;
                else if (hardWorkoutInMinutes <= 9) return 1;
                else if (hardWorkoutInMinutes <= 13) return 2;
                else return 3;
            }
        }
    }

    private calculateSleep(mode: WeightMode, sleep: number | null, multiplier: number): number {
        if (!sleep) return 0;

        const sleepInMinutes = sleep / multiplier;

        switch (mode) {
            case WeightMode.GAIN:
            case WeightMode.KEEPING:
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2:
            case WeightMode['LOSS_3.3']: {
                if (sleepInMinutes <= 299) return 0;
                else if (sleepInMinutes <= 359) return 1;
                else if (sleepInMinutes <= 419 || sleepInMinutes >= 541) return 2;
                else return 3;
            }
            default: return 0;
        }
    }

    private calculateRestingHeartRate(heartRate: number | null, gender: GenderType, age: number): number {
        if (!heartRate) return 0;

        if (age <= 25) {
            if (gender === GenderType.MALE) {
                if (heartRate >= 82) return 0;
                else if (heartRate <= 48 || heartRate >= 70 && heartRate <= 81) return 1;
                else if (heartRate >= 62 && heartRate <= 69) return 2;
                return 3;
            } else {
                if (heartRate >= 85) return 0;
                else if (heartRate <= 53 || heartRate >= 73 && heartRate <= 82) return 1;
                else if (heartRate >= 66 && heartRate <= 73) return 2;
                return 3;
            }
        } else if (age <= 35) {
            if (gender === GenderType.MALE) {
                if (heartRate >= 82) return 0;
                else if (heartRate <= 48 || heartRate >= 71 && heartRate <= 81) return 1;
                else if (heartRate >= 62 && heartRate <= 70) return 2;
                return 3;
            } else {
                if (heartRate >= 83) return 0;
                else if (heartRate <= 53 || heartRate >= 73 && heartRate <= 82) return 1;
                else if (heartRate >= 65 && heartRate <= 72) return 2;
                return 3;
            }
        } else if (age <= 45) {
            if (gender === GenderType.MALE) {
                if (heartRate >= 83) return 0;
                else if (heartRate <= 49 || heartRate >= 71 && heartRate <= 82) return 1;
                else if (heartRate >= 63 && heartRate <= 70) return 2;
                return 3;
            } else {
                if (heartRate >= 84) return 0;
                else if (heartRate <= 53 || heartRate >= 74 && heartRate <= 83) return 1;
                else if (heartRate >= 66 && heartRate <= 73) return 2;
                return 3;
            }
        } else if (age <= 55) {
            if (gender === GenderType.MALE) {
                if (heartRate >= 82) return 0;
                else if (heartRate <= 50 || heartRate >= 72 && heartRate <= 81) return 1;
                else if (heartRate >= 62 && heartRate <= 71) return 2;
                return 3;
            } else {
                if (heartRate >= 84) return 0;
                else if (heartRate <= 53 || heartRate >= 74 && heartRate <= 83) return 1;
                else if (heartRate >= 65 && heartRate <= 73) return 2;
                return 3;
            }
        } else if (age <= 65) {
            if (gender === GenderType.MALE) {
                if (heartRate >= 82) return 0;
                else if (heartRate <= 50 || heartRate >= 72 && heartRate <= 81) return 1;
                else if (heartRate >= 62 && heartRate <= 71) return 2;
                return 3;
            } else {
                if (heartRate >= 84) return 0;
                else if (heartRate <= 53 || heartRate >= 74 && heartRate <= 83) return 1;
                else if (heartRate >= 65 && heartRate <= 73) return 2;
                return 3;
            }
        } else {
            if (gender === GenderType.MALE) {
                if (heartRate >= 80) return 0;
                else if (heartRate <= 49 || heartRate >= 70 && heartRate <= 79) return 1;
                else if (heartRate >= 62 && heartRate <= 69) return 2;
                return 3;
            } else {
                if (heartRate >= 84) return 0;
                else if (heartRate <= 53 || heartRate >= 73 && heartRate <= 84) return 1;
                else if (heartRate >= 65 && heartRate <= 72) return 2;
                return 3;
            }
        }
    }
}
