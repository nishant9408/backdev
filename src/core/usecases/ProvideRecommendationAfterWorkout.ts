import { Injectable } from '@nestjs/common';
import { ActivityLevel } from '../data/ActivityLevel';
import { ProvideRecommendationAfterWorkoutDTO } from '../DTO/ProvideRecommendationAfterWorkoutDTO';
import { getRandomInt } from '../sharedKernel/getRandomInt';

@Injectable()
export class ProvideRecommendationAfterWorkout {
    private readonly activityLevelToRecommendation = {
        [ActivityLevel.LOW]: [
            '1 fruit',
            '200 ml of yogurt',
            'protein bar',
            '1 egg',
            '80g of low-fat fish and some vegetables',
            '80g of poultry meat with vegetables',
        ],
        [ActivityLevel.MEDIUM]: [
            '2 fruits',
            '200 ml of yogurt and 1 fruit',
            '2 protein bars',
            'protein cocktail',
            '150g of non-fat cottage cheese and 1 fruit',
            '1 toast with 30g of your favorite cheese',
            '120g of low-fat fish and some vegetables',
            '120g of poultry meat with vegetables',
        ],
        [ActivityLevel.HIGH]: [
            'protein cocktail with 1 fruit',
            'whole grains, and 120g of poultry meat with vegetables',
            'whole grains, and 120g of fish with vegetables',
            '200g of low-fat cottage cheese and 2 fruits',
            '300ml of plant-based milk with 2 fruits',
            '2 protein bars wih 2 fruits',
        ],
    };

    public execute(request: ProvideRecommendationAfterWorkoutDTO): string {
        const activityLevel = this.determineActivityLevel(request.calories);
        return this.determineRecommendation(activityLevel);
    }

    private determineActivityLevel(caloriesPerHour: number): ActivityLevel {
        if (caloriesPerHour <= 300) return ActivityLevel.LOW;
        if (caloriesPerHour <= 500) return ActivityLevel.MEDIUM;
        return ActivityLevel.HIGH;
    }

    private determineRecommendation(activityLevelValue: string): string {
        const recommendations = this.activityLevelToRecommendation[activityLevelValue];

        const min = 0;
        const max = recommendations.length - 1;
        const index = getRandomInt(min, max);

        return recommendations[index];
    }

}
