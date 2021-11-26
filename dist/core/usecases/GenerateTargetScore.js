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
exports.GenerateTargetScore = void 0;
const common_1 = require("@nestjs/common");
const GenderType_1 = require("../data/GenderType");
const TargetScore_1 = require("../data/TargetScore");
const Repository_1 = require("../ports/Repository");
const TargetScoreRepository_1 = require("../ports/TargetScoreRepository");
const UserRepository_1 = require("../user/port/UserRepository");
const ScheduleTargetScorePushes_1 = require("./ScheduleTargetScorePushes");
let GenerateTargetScore = class GenerateTargetScore {
    constructor(repository, userRepositoryType, targetScoreRepository, scheduleTargetScorePushes) {
        this.repository = repository;
        this.userRepositoryType = userRepositoryType;
        this.targetScoreRepository = targetScoreRepository;
        this.scheduleTargetScorePushes = scheduleTargetScorePushes;
        this.PLAN_SCORE = 10;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let dailyScores = [];
            const [targetScores, user] = yield Promise.all([
                this.targetScoreRepository.getTargetScoresByUserId(userId),
                this.userRepositoryType.findById(userId),
            ]);
            if (!user) {
                throw new common_1.InternalServerErrorException('user not found');
            }
            if (!targetScores.length) {
                const dailyScore = yield this.repository.getDailyScoreByUserId(userId);
                return this.saveDefaultTargetScore(user, dailyScore);
            }
            const lastTarget = targetScores[0];
            const lastCreatedIn = targetScores[0].createdAt;
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
                    dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.createdAt);
                }
                else if (differenceInDays > 2 * 30) {
                    updateFlag = true;
                    dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.updatedAt);
                }
                else {
                    updateFlag = true;
                    isNewPeriod = false;
                    isSecondPeriod = true;
                    dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.createdAt);
                }
            }
            else {
                if (differenceInDays > 30) {
                    updateFlag = true;
                    isSecondPeriod = true;
                    isNewPeriod = true;
                    dailyScoresPeriod = this.calculateDailyScoresPeriod(lastTarget.createdAt);
                }
            }
            if (updateFlag) {
                dailyScores = yield this.repository.getDailyForPeriod(userId, dailyScoresPeriod);
                let targetScore = this.calculateTargetScores(user, dailyScores, targetScores, isNewPeriod);
                if (isNewPeriod || isSecondPeriod) {
                    targetScore.currentScore = yield this.calculateCurrentScore(userId);
                    targetScore.recommendations = this.generateRecommendation(targetScore);
                    yield this.scheduleTargetScorePushes.execute({
                        userId,
                        timezone: user.timezone,
                        notificationToken: user.notificationToken,
                    });
                }
                else if (lastTarget.period === 1) {
                    targetScore.recommendations = ['We need to gather more data to evaluate your monthly score and generate recommendation for next period'];
                }
                targetScore = yield this.targetScoreRepository.saveTargetScore(targetScore);
                return targetScore;
            }
            return lastTarget;
        });
    }
    generateRecommendation(target) {
        const { planCalories, averageCalories } = target;
        const diff = averageCalories / planCalories * 100;
        if (diff < 10)
            return ['Perfect! You have great results in keeping needed number of calories burned for your goal.'];
        if (diff < 20)
            return ['Good result! Follow the daily recommendation to achieve your goal.'];
        if (diff < 30)
            return ['Pay attention to your diet and exercise plan. To achieve your goal, you need to train according to the daily suggestions.'];
        return ['You need to adjust your workouts and train the recommended amount of time to effectively reach your goal.'];
    }
    calculateCurrentScore(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dailyScores = yield this.repository.getDailyForPeriod(userId);
            if (!dailyScores.length)
                return 0;
            const value = dailyScores.reduce((acc, v) => acc + (v && v.score || 0), 0);
            return Math.round(value / dailyScores.length);
        });
    }
    calculateDifferenceInDays(from, to) {
        const differenceInTime = to.getTime() - from.getTime();
        return Math.round(differenceInTime / (1000 * 3600 * 24));
    }
    calculateDailyScoresPeriod(date) {
        date.setSeconds(0, 0);
        return date;
    }
    calculateTargetScores(user, dailyScores, targetScores, isNewPeriod) {
        let activity = 0;
        let calories = 0;
        let score = 0;
        let monthlyScore = 0;
        const lastTargetScore = targetScores[0];
        const total = dailyScores.length;
        for (const dailyScore of dailyScores) {
            activity += dailyScore.totalActivity;
            calories += dailyScore.calories;
            score += dailyScore.score;
        }
        const currentScore = Math.round(score / total);
        const target = new TargetScore_1.TargetScore();
        if (!isNewPeriod) {
            target.id = lastTargetScore.id;
            target.period = lastTargetScore.period;
        }
        else {
            target.period = lastTargetScore.period + 1;
        }
        target.userId = user.id;
        target.planScore = lastTargetScore.planScore;
        target.planActivity = lastTargetScore.planActivity;
        target.planCalories = lastTargetScore.planCalories;
        target.averageActivity = Math.round(activity / total) || 0;
        target.averageCalories = Math.round(calories / total) || 0;
        target.currentScore = currentScore;
        target.updatedAt = new Date();
        if (targetScores.length === 1) {
            target.monthlyScore = currentScore;
        }
        else {
            for (const targetScore of targetScores) {
                monthlyScore += targetScore.monthlyScore;
            }
            target.monthlyScore = Math.round(monthlyScore / targetScores.length);
        }
        return target;
    }
    saveDefaultTargetScore(user, dailyScore) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.targetScoreRepository.saveTargetScore(TargetScore_1.TargetScore.fromObject({
                userId: user.id,
                planScore: this.PLAN_SCORE,
                currentScore,
                monthlyScore,
                averageCalories,
                planCalories: this.calculatePlanCalories(user),
                averageActivity,
                planActivity: this.calculatePlanActivity(user),
                period: 1,
                recommendations: ['We need to gather more data to evaluate your monthly score and generate recommendation for next period'],
            }));
        });
    }
    calculatePlanActivity(user) {
        const { weight: currentWeight, targetWeight } = user;
        const multiplier = 60 * 1000;
        if (currentWeight < targetWeight)
            return 50 * multiplier;
        return 60 * multiplier;
    }
    calculatePlanCalories(user, steps = null) {
        const { gender, height, weight, age, targetWeight } = user;
        const physicalActivity = this.calculatePhysicalActivity(steps);
        const basalMetabolism = this.calculateBasalMetabolism(gender, height, weight, age);
        return this.calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, weight, targetWeight);
    }
    calculatePhysicalActivity(steps) {
        if (steps === null)
            return 1.3;
        if (!steps || steps <= 5000)
            return 1.2;
        if (steps <= 9999)
            return 1.3;
        return 1.4;
    }
    calculateBasalMetabolism(gender, height, weight, age) {
        const k = gender === GenderType_1.GenderType.MALE ? v => v + 5 : v => v - 161;
        const bx = k(10 * weight + 6.25 * height + 5 * age);
        return bx;
    }
    calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, currentWeight, targetWeight) {
        const dailyEnergy = physicalActivity * basalMetabolism;
        if (currentWeight < targetWeight)
            return dailyEnergy + 0.2 * dailyEnergy;
        if (currentWeight > targetWeight)
            return Math.max(dailyEnergy - 0.2 * dailyEnergy, basalMetabolism);
        return dailyEnergy;
    }
};
GenerateTargetScore = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(1, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(2, (0, common_1.Inject)(TargetScoreRepository_1.TargetScoreRepositoryType)),
    __metadata("design:paramtypes", [Object, Object, Object, ScheduleTargetScorePushes_1.ScheduleTargetScorePushes])
], GenerateTargetScore);
exports.GenerateTargetScore = GenerateTargetScore;
//# sourceMappingURL=GenerateTargetScore.js.map