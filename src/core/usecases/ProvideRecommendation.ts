import { Inject, Injectable } from '@nestjs/common';
import { ActivityLevel } from '../data/ActivityLevel';
import { AgeRange } from '../data/AgeRange';
import { FoodTime } from '../data/FoodTime';
import { GenderType } from '../data/GenderType';
import { Health } from '../data/Health';
import { ProvideRecommendationDTO } from '../DTO/ProvideRecommendationDTO';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class ProvideRecommendation {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(request: ProvideRecommendationDTO): Promise<string[]> {
        const { healthData, foodTime } = request;

        const activityLevel = this.determineActivityLevel(healthData);
        const gender = this.determineGender(healthData);
        const age = this.determineAge(healthData);

        const categories = this.getCategories(activityLevel, age, foodTime, gender);

        return categories;
    }

    private async getCategories(
        activityLevel: ActivityLevel,
        age?: AgeRange,
        foodTime?: FoodTime,
        gender?: GenderType,
    ): Promise<string[]> {
        const recommendations = await this.repositoryAdapter.findRecommendations(activityLevel, age, foodTime, gender);
        if (!recommendations.length) {
            throw new Error('no recommendation');
        }

        return recommendations
            .map(recommendation => recommendation.categories)
            .reduce((acc, val) => acc.concat(val), []);
    }

    private determineAge(healthData: Health): AgeRange {
        const dateOfBirth = healthData.dateOfBirth;

        const diffMs = Date.now() - new Date(dateOfBirth).getTime();
        const age = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);

        if (age <= 30) return [ 18, 30 ];
        if (age <= 40) return [ 31, 40 ];
        if (age <= 50) return [ 41, 50 ];
        if (age <= 60) return [ 51, 60 ];
        return [ 61, 100 ];
    }

    private determineGender(healthData: Health): GenderType {
        return healthData.gender;
    }

    private determineActivityLevel(healthData: Health): ActivityLevel {
        const steps = healthData.stepCount;
        const activities = healthData.workoutCount;

        if (
            (steps <= 5000 && activities <= 2) ||
            (steps <= 10000 && activities === 0)
        ) return ActivityLevel.LOW;

        if (
            (steps > 5000 && steps <= 10000 && activities >= 1 && activities <= 3) ||
            (steps > 10000 && activities === 0)
        ) return ActivityLevel.MEDIUM;

        if (
            (steps <= 5000 && activities > 3) ||
            (steps > 10000 && activities > 3)
        ) return ActivityLevel.HIGH;

        return ActivityLevel.MEDIUM;

    }
}
