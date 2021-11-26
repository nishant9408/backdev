"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvideRecommendationAfterWorkout = void 0;
const common_1 = require("@nestjs/common");
const ActivityLevel_1 = require("../data/ActivityLevel");
const getRandomInt_1 = require("../sharedKernel/getRandomInt");
let ProvideRecommendationAfterWorkout = class ProvideRecommendationAfterWorkout {
    constructor() {
        this.activityLevelToRecommendation = {
            [ActivityLevel_1.ActivityLevel.LOW]: [
                '1 fruit',
                '200 ml of yogurt',
                'protein bar',
                '1 egg',
                '80g of low-fat fish and some vegetables',
                '80g of poultry meat with vegetables',
            ],
            [ActivityLevel_1.ActivityLevel.MEDIUM]: [
                '2 fruits',
                '200 ml of yogurt and 1 fruit',
                '2 protein bars',
                'protein cocktail',
                '150g of non-fat cottage cheese and 1 fruit',
                '1 toast with 30g of your favorite cheese',
                '120g of low-fat fish and some vegetables',
                '120g of poultry meat with vegetables',
            ],
            [ActivityLevel_1.ActivityLevel.HIGH]: [
                'protein cocktail with 1 fruit',
                'whole grains, and 120g of poultry meat with vegetables',
                'whole grains, and 120g of fish with vegetables',
                '200g of low-fat cottage cheese and 2 fruits',
                '300ml of plant-based milk with 2 fruits',
                '2 protein bars wih 2 fruits',
            ],
        };
    }
    execute(request) {
        const activityLevel = this.determineActivityLevel(request.calories);
        return this.determineRecommendation(activityLevel);
    }
    determineActivityLevel(caloriesPerHour) {
        if (caloriesPerHour <= 300)
            return ActivityLevel_1.ActivityLevel.LOW;
        if (caloriesPerHour <= 500)
            return ActivityLevel_1.ActivityLevel.MEDIUM;
        return ActivityLevel_1.ActivityLevel.HIGH;
    }
    determineRecommendation(activityLevelValue) {
        const recommendations = this.activityLevelToRecommendation[activityLevelValue];
        const min = 0;
        const max = recommendations.length - 1;
        const index = (0, getRandomInt_1.getRandomInt)(min, max);
        return recommendations[index];
    }
};
ProvideRecommendationAfterWorkout = __decorate([
    (0, common_1.Injectable)()
], ProvideRecommendationAfterWorkout);
exports.ProvideRecommendationAfterWorkout = ProvideRecommendationAfterWorkout;
//# sourceMappingURL=ProvideRecommendationAfterWorkout.js.map