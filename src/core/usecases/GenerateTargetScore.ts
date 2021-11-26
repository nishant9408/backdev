import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DailyScore } from '../data/DailyScore';
import { GenderType } from '../data/GenderType';
import { TargetScore } from '../data/TargetScore';
import { Repository, RepositoryType } from '../ports/Repository';
import { TargetScoreRepository, TargetScoreRepositoryType } from '../ports/TargetScoreRepository';
import { User } from '../user/domain/data/User';
import { UserRepository, UserRepositoryType } from '../user/port/UserRepository';
import { ScheduleTargetScorePushes } from './ScheduleTargetScorePushes';

@Injectable()
export class GenerateTargetScore {
    private readonly PLAN_SCORE = 10;
    constructor(
        @Inject(RepositoryType)
        private readonly repository: Repository,
        @Inject(UserRepositoryType)
        private readonly userRepositoryType: UserRepository,
        @Inject(TargetScoreRepositoryType)
        private readonly targetScoreRepository: TargetScoreRepository,
        private readonly scheduleTargetScorePushes: ScheduleTargetScorePushes,
    ) { }

    public async execute(userId: number): Promise<TargetScore> {
        let dailyScores: DailyScore[] = [];

        const [ targetScores, user ] = await Promise.all([
            this.targetScoreRepository.getTargetScoresByUserId(userId),
            this.userRepositoryType.findById(userId),
        ]);
        if (!user) {
            throw new InternalServerErrorException('user not found');
        }
        if (!targetScores.length) {
            const dailyScore = await this.repository.getDailyScoreByUserId(userId);
            return this.saveDefaultTargetScore(user, dailyScore);
        }
        const lastTarget = targetScores[0] as TargetScore;

        const lastCreatedIn = targetScores[0].createdAt as Date;
        const now = new Date();
        const differenceInDays = this.calculateDifferenceInDays(lastCreatedIn, now);

        let updateFlag = false;
        let isSecondPeriod = false;
        let isNewPeriod = true;
        let dailyScoresPeriod = new Date();
        if (lastTarget.period === 1) {
            if (differenceInDays < 30) {
                isNewPeriod = false;
                updateFlag = true;
                dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.createdAt as Date);
            } else if (differenceInDays > 2 * 30) {
                updateFlag = true;
                dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.updatedAt as Date);
            } else { // 2 month
                updateFlag = true;
                isNewPeriod = false;
                isSecondPeriod = true;
                dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.createdAt as Date);
            }
        } else {
            if (differenceInDays > 30) {
                updateFlag = true;
                isSecondPeriod = true;
                isNewPeriod = true;
                dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.createdAt as Date);
            }
        }

        if (updateFlag) {
            dailyScores = await this.repository.getDailyForPeriod(userId, dailyScoresPeriod);
            let targetScore = this.calculateTargetScores(user, dailyScores, targetScores, isNewPeriod);
            if (isNewPeriod || isSecondPeriod) {
                targetScore.currentScore = await this.calculateCurrentScore(userId);
                targetScore.recommendations = this.generateRecommendation(targetScore);

                await this.scheduleTargetScorePushes.execute({
                    userId,
                    timezone: user.timezone,
                    notificationToken: user.notificationToken,
                });
            } else if (lastTarget.period === 1) {
                targetScore.recommendations = [ 'We need to gather more data to evaluate your monthly score and generate recommendation for next period' ];
            }
            targetScore = await this.targetScoreRepository.saveTargetScore(targetScore);
            return targetScore;
        }

        return lastTarget;
    }

    private generateRecommendation(target: TargetScore): string[] {
        const { planCalories, averageCalories } = target;
        const diff = averageCalories / planCalories * 100;
        if (diff < 10) return [ 'Perfect! You have great results in keeping needed number of calories burned for your goal.' ];
        if (diff < 20) return [ 'Good result! Follow the daily recommendation to achieve your goal.' ];
        if (diff < 30) return [ 'Pay attention to your diet and exercise plan. To achieve your goal, you need to train according to the daily suggestions.' ];
        return [ 'You need to adjust your workouts and train the recommended amount of time to effectively reach your goal.' ];
    }

    private async calculateCurrentScore(userId: number): Promise<number> {
        const dailyScores = await this.repository.getDailyForPeriod(userId);
        if (!dailyScores.length) return 0;
        const value = dailyScores.reduce((acc, v: DailyScore) => acc + (v && v.score || 0), 0);
        return Math.round(value / dailyScores.length);
    }

    private calculateDifferenceInDays(from: Date, to: Date): number {
        const differenceInTime = to.getTime() - from.getTime();
        return  Math.round(differenceInTime / (1000 * 3600 * 24));
    }

    private calculateDailyScoresPeriod(date: Date): Date {
        date.setSeconds(0, 0);
        return date;
    }

    private calculateTargetScores(user: User, dailyScores: DailyScore[], targetScores: TargetScore[], isNewPeriod: boolean): TargetScore {
        let activity = 0;
        let calories = 0;
        let score = 0;
        let monthlyScore = 0;
        const lastTargetScore = targetScores[0];
        const total = dailyScores.length;
        for (const dailyScore of dailyScores) {
            activity += dailyScore.totalActivity as number;
            calories += dailyScore.calories as number;
            score += dailyScore.score as number;
        }
        const currentScore = Math.round(score / total);
        const target = new TargetScore();
        if (!isNewPeriod) {
            target.id = lastTargetScore.id;
            target.period = lastTargetScore.period;
        } else {
            target.period = lastTargetScore.period + 1;
        }
        target.userId = user.id as number;
        target.planScore = lastTargetScore.planScore;
        target.planActivity = lastTargetScore.planActivity;
        target.planCalories = lastTargetScore.planCalories;
        target.averageActivity = Math.round(activity / total) || 0;
        target.averageCalories = Math.round(calories / total) || 0;
        target.currentScore = currentScore;
        target.updatedAt = new Date();
        if (targetScores.length === 1) { // it means that is first month of usage
            target.monthlyScore = currentScore;
        } else {
            for (const targetScore of targetScores) {
                monthlyScore += targetScore.monthlyScore;
            }
            target.monthlyScore = Math.round(monthlyScore / targetScores.length);
        }
        return target;
    }

    private async saveDefaultTargetScore(user: User, dailyScore: DailyScore | null): Promise<TargetScore> {
        let currentScore = 0;
        let monthlyScore = 0;
        let averageCalories = 0;
        let averageActivity = 0;
        if (dailyScore) {
            currentScore = dailyScore.score || 0;
            monthlyScore = currentScore;
            averageCalories = dailyScore.calories || 0;
            averageActivity = dailyScore.totalActivity || 0;
        }

        return await this.targetScoreRepository.saveTargetScore(TargetScore.fromObject({
            userId: user.id as number,
            planScore: this.PLAN_SCORE,
            currentScore,
            monthlyScore,
            averageCalories,
            planCalories: this.calculatePlanCalories(user),
            averageActivity,
            planActivity: this.calculatePlanActivity(user),
            period: 1,
            recommendations:  [ 'We need to gather more data to evaluate your monthly score and generate recommendation for next period' ],
        }));
    }

    private calculatePlanActivity(user: User): number {
        const { weight: currentWeight, targetWeight } = user;
        const multiplier = 60 * 1000; // minutes => ms
        if (currentWeight < targetWeight) return 50 * multiplier;
        return 60 * multiplier;
    }

    // Code duplication from ProvideFoodInfoAndScore.ts
    private calculatePlanCalories(user: User, steps: number | null = null): number {
        const { gender, height, weight, age, targetWeight } = user;
        const physicalActivity = this.calculatePhysicalActivity(steps);
        const basalMetabolism = this.calculateBasalMetabolism(gender, height, weight, age);
        return  this.calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, weight, targetWeight);
    }

    private calculatePhysicalActivity(steps: number | null): number {
        if (steps === null) return 1.3;
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
}
