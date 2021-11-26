"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvideRecommendation = void 0;
const common_1 = require("@nestjs/common");
const ActivityLevel_1 = require("../data/ActivityLevel");
const Repository_1 = require("../ports/Repository");
let ProvideRecommendation = class ProvideRecommendation {
    constructor(repositoryAdapter) {
        this.repositoryAdapter = repositoryAdapter;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { healthData, foodTime } = request;
            const activityLevel = this.determineActivityLevel(healthData);
            const gender = this.determineGender(healthData);
            const age = this.determineAge(healthData);
            const categories = this.getCategories(activityLevel, age, foodTime, gender);
            return categories;
        });
    }
    getCategories(activityLevel, age, foodTime, gender) {
        return __awaiter(this, void 0, void 0, function* () {
            const recommendations = yield this.repositoryAdapter.findRecommendations(activityLevel, age, foodTime, gender);
            if (!recommendations.length) {
                throw new Error('no recommendation');
            }
            return recommendations
                .map(recommendation => recommendation.categories)
                .reduce((acc, val) => acc.concat(val), []);
        });
    }
    determineAge(healthData) {
        const dateOfBirth = healthData.dateOfBirth;
        const diffMs = Date.now() - new Date(dateOfBirth).getTime();
        const age = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);
        if (age <= 30)
            return [18, 30];
        if (age <= 40)
            return [31, 40];
        if (age <= 50)
            return [41, 50];
        if (age <= 60)
            return [51, 60];
        return [61, 100];
    }
    determineGender(healthData) {
        return healthData.gender;
    }
    determineActivityLevel(healthData) {
        const steps = healthData.stepCount;
        const activities = healthData.workoutCount;
        if ((steps <= 5000 && activities <= 2) ||
            (steps <= 10000 && activities === 0))
            return ActivityLevel_1.ActivityLevel.LOW;
        if ((steps > 5000 && steps <= 10000 && activities >= 1 && activities <= 3) ||
            (steps > 10000 && activities === 0))
            return ActivityLevel_1.ActivityLevel.MEDIUM;
        if ((steps <= 5000 && activities > 3) ||
            (steps > 10000 && activities > 3))
            return ActivityLevel_1.ActivityLevel.HIGH;
        return ActivityLevel_1.ActivityLevel.MEDIUM;
    }
};
ProvideRecommendation = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object])
], ProvideRecommendation);
exports.ProvideRecommendation = ProvideRecommendation;
//# sourceMappingURL=ProvideRecommendation.js.map