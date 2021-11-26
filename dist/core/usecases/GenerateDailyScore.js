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
exports.GenerateDailyScore = exports.WeightMode = void 0;
const common_1 = require("@nestjs/common");
const Logger_1 = require("../../configuration/Logger");
const DailyScore_1 = require("../data/DailyScore");
const GenderType_1 = require("../data/GenderType");
const HealthProviderName_1 = require("../data/HealthProviderName");
const HealthProviderPort_1 = require("../ports/HealthProviderPort");
const Repository_1 = require("../ports/Repository");
const UserRepository_1 = require("../user/port/UserRepository");
const UpdateProviderInformation_1 = require("./UpdateProviderInformation");
var WeightMode;
(function (WeightMode) {
    WeightMode["GAIN"] = "gain";
    WeightMode["KEEPING"] = "keeping";
    WeightMode["LOSS_1"] = "loss_1";
    WeightMode["LOSS_2"] = "loss_2";
    WeightMode["LOSS_3.3"] = "loss_3.3";
})(WeightMode = exports.WeightMode || (exports.WeightMode = {}));
let GenerateDailyScore = class GenerateDailyScore {
    constructor(userRepository, repositoryAdapter, healthProviderPortAdapter, updateProviderInformation) {
        this.userRepository = userRepository;
        this.repositoryAdapter = repositoryAdapter;
        this.healthProviderPortAdapter = healthProviderPortAdapter;
        this.updateProviderInformation = updateProviderInformation;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let userProvider;
            let user;
            [userProvider, user] = yield Promise.all([
                this.repositoryAdapter.getHealthProviderDataByUserId(request.userId),
                this.userRepository.findById(request.userId),
            ]);
            if (!user) {
                throw new common_1.InternalServerErrorException('user not found');
            }
            if (!userProvider) {
                throw new common_1.InternalServerErrorException('user provider not found');
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
            if (userProvider.name === HealthProviderName_1.HealthProviderName.FITBIT) {
                Logger_1.default.info({ userId: request.userId, userProvider, message: 'Before update' });
                userProvider = yield this.updateProviderInformation.execute(userProvider);
                Logger_1.default.info({ userId: request.userId, userProvider, message: 'After update' });
                const dataFromProvider = yield this.healthProviderPortAdapter.getDailyStats(userProvider);
                Logger_1.default.info({ userId: request.userId, dataFromProvider });
                dailyScoreParams = {
                    sleep: dataFromProvider.sleep || user.averageSleepingTime,
                    steps: dataFromProvider.steps,
                    heartRate: dataFromProvider.heartRate,
                    lightWorkout: dataFromProvider.lightWorkout,
                    moderateWorkout: dataFromProvider.moderateWorkout,
                    hardWorkout: dataFromProvider.hardWorkout,
                    totalActivity: dataFromProvider.totalActivity,
                    calories: dataFromProvider.calories,
                    restingHeartRate: dataFromProvider.restingHeartRate,
                };
            }
            const mode = this.defineMode(user);
            const [score, recommendations, alert] = this.calculateDailyScore(Object.assign(Object.assign({}, dailyScoreParams), { gender: user.gender, age: user.age, mode }));
            const dailyCalories = this.calculateDailyCalories(user, dailyScoreParams.steps);
            recommendations.push(`Recommended calories for today is near ${dailyCalories} kcal.`);
            const isSameDay = this.isSameDay(user.createdAt, new Date());
            let updateScoreBool = false;
            const latestDailyScore = yield this.repositoryAdapter.getDailyScoreByUserId(request.userId);
            if (latestDailyScore && this.isSameDay(latestDailyScore.createdAt, new Date())) {
                updateScoreBool = true;
            }
            return yield this.repositoryAdapter.saveDailyScore(DailyScore_1.DailyScore.fromObject(Object.assign(Object.assign(Object.assign({}, (updateScoreBool ? latestDailyScore : {})), dailyScoreParams), { createdAt: new Date(), score, alert: !isSameDay ? alert : null, userId: user.id, recommendations, recommendedCalories: dailyCalories })));
        });
    }
    isSameDay(first, second) {
        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDay() === second.getDay();
    }
    defineMode(user) {
        if (user.targetWeight > user.weight)
            return WeightMode.GAIN;
        if (user.targetWeight === user.weight)
            return WeightMode.KEEPING;
        if (user.weightLossIntensity <= 1)
            return WeightMode.LOSS_1;
        if (user.weightLossIntensity <= 2)
            return WeightMode.LOSS_2;
        return WeightMode['LOSS_3.3'];
    }
    calculateDailyScore(params) {
        const { totalActivity, sleep, restingHeartRate, age, gender, lightWorkout, hardWorkout, moderateWorkout, steps, mode } = params;
        const multiplier = 60 * 1000;
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
        const scoreCommon = this.calculateScore(activityScore, stepsScore, sleepScore, restingScore, hardWorkoutScore, lightWorkoutScore, moderateWorkoutScore);
        const k = 0.4761;
        const score = Math.round(scoreCommon * k);
        const targetStatus = `Based on your activity, you are ${score > 6 ? 'on' : 'off'} your target.`;
        recommendations = [targetStatus, ...recommendations];
        const alert = restingScore === 0 &&
            restingHeartRate !== null &&
            restingHeartRate > 0 ? 'Pay attention, your resting heart rate is high, take care.' : null;
        return [score, recommendations, alert];
    }
    calculateDailyCalories(user, steps) {
        if (steps === null)
            return 0;
        const { gender, height, weight, age, targetWeight } = user;
        const physicalActivity = this.calculatePhysicalActivity(steps);
        const basalMetabolism = this.calculateBasalMetabolism(gender, height, weight, age);
        return Math.round(this.calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, weight, targetWeight));
    }
    calculatePhysicalActivity(steps) {
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
    calculateScore(...scores) {
        return scores.reduce((acc, score) => acc + score, 0);
    }
    activityRecommendations(score) {
        switch (score) {
            case 0: return ['To achieve the goal, you need to exercise more.'];
            case 1: return ['Keep your physical activity within 50 - 60 min.'];
            case 2: return ['Increase workout duration by 10 minutes to achieve your target.'];
            default: return [];
        }
    }
    stepsRecommendations(score) {
        switch (score) {
            case 0: return ['Walk more, you need to have 5000+ steps passed in a day.'];
            case 1: return ['Go 3000+ steps more for the best result.'];
            case 2: return ['You are almost there, go 1700+ steps more today.'];
            default: return [];
        }
    }
    sleepRecommendations(score) {
        switch (score) {
            case 0: return ['Sleep not less that 7 hours.'];
            case 1: return ['Sleep 2 hours more.'];
            case 2: return ['Sleep within 7-8 hours in a day.'];
            default: return [];
        }
    }
    workoutRecommendation(lightWorkoutScore, moderateWorkoutScore, hardWorkoutScore) {
        const start = 'Increase workout time with';
        const recommendations = [
            ...this.lightWorkoutRecommendations(lightWorkoutScore),
        ];
        if (!recommendations.length)
            return [];
        return [`${start} ${recommendations.join(', ')}.`];
    }
    lightWorkoutRecommendations(score) {
        switch (score) {
            case 0: return ['heart rate of 107-132 to 31-40 minutes'];
            case 1: return ['heart rate of 107-132 to 31-40 minutes'];
            case 2: return ['heart rate of 107-132 by 10 minutes'];
            default: return [];
        }
    }
    calculateTotalActivity(mode, totalActivity, multiplier) {
        if (!totalActivity)
            return 0;
        const totalActivityInMinutes = totalActivity / multiplier;
        switch (mode) {
            case WeightMode.GAIN: {
                if (totalActivityInMinutes <= 15)
                    return 0;
                else if (totalActivityInMinutes <= 32 || totalActivityInMinutes >= 61)
                    return 1;
                else if (totalActivityInMinutes <= 49)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.KEEPING:
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2:
            case WeightMode['LOSS_3.3']: {
                if (!totalActivityInMinutes || totalActivityInMinutes <= 19)
                    return 0;
                else if (totalActivityInMinutes <= 39)
                    return 1;
                else if (totalActivityInMinutes <= 59)
                    return 2;
                else
                    return 3;
            }
            default: return 0;
        }
    }
    calculateSteps(mode, steps) {
        if (!steps)
            return 0;
        switch (mode) {
            case WeightMode.GAIN: {
                if (steps <= 1599)
                    return 0;
                else if (steps <= 3299)
                    return 1;
                else if (steps <= 4999)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.KEEPING: {
                if (steps <= 1999)
                    return 0;
                else if (steps <= 3999)
                    return 1;
                else if (steps <= 5999)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.LOSS_1: {
                if (steps <= 2299)
                    return 0;
                else if (steps <= 4599)
                    return 1;
                else if (steps <= 6999)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.LOSS_2: {
                if (steps <= 2699)
                    return 0;
                else if (steps <= 5399)
                    return 1;
                else if (steps <= 7999)
                    return 2;
                else
                    return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (steps <= 2999)
                    return 0;
                else if (steps <= 5999)
                    return 1;
                else if (steps <= 8999)
                    return 2;
                else
                    return 3;
            }
            default: return 0;
        }
    }
    calculateLightWorkout(mode, lightWorkout, multiplier) {
        if (!lightWorkout)
            return 0;
        const lightWorkoutInMinutes = lightWorkout / multiplier;
        switch (mode) {
            case WeightMode.GAIN: {
                if (lightWorkoutInMinutes <= 10)
                    return 0;
                else if (lightWorkoutInMinutes <= 20 || lightWorkoutInMinutes >= 41)
                    return 1;
                else if (lightWorkoutInMinutes <= 30)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.KEEPING: {
                if (lightWorkoutInMinutes <= 14)
                    return 0;
                else if (lightWorkoutInMinutes <= 32)
                    return 1;
                else if (lightWorkoutInMinutes <= 49)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.LOSS_1: {
                if (lightWorkoutInMinutes <= 17)
                    return 0;
                else if (lightWorkoutInMinutes <= 35)
                    return 1;
                else if (lightWorkoutInMinutes <= 54)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.LOSS_2: {
                if (lightWorkoutInMinutes <= 19)
                    return 0;
                else if (lightWorkoutInMinutes <= 39)
                    return 1;
                else if (lightWorkoutInMinutes <= 59)
                    return 2;
                else
                    return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (lightWorkoutInMinutes <= 19)
                    return 0;
                else if (lightWorkoutInMinutes <= 39)
                    return 1;
                else if (lightWorkoutInMinutes <= 64)
                    return 2;
                else
                    return 3;
            }
        }
    }
    calculateModerateWorkout(mode, moderateWorkout, multiplier) {
        if (!moderateWorkout)
            return 0;
        const moderateWorkoutInMinutes = moderateWorkout / multiplier;
        switch (mode) {
            case WeightMode.GAIN: {
                if (moderateWorkoutInMinutes <= 4)
                    return 0;
                else if (moderateWorkoutInMinutes <= 9 || moderateWorkoutInMinutes >= 18)
                    return 1;
                else if (moderateWorkoutInMinutes <= 12)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.KEEPING: {
                if (moderateWorkoutInMinutes <= 5)
                    return 0;
                else if (moderateWorkoutInMinutes <= 11)
                    return 1;
                else if (moderateWorkoutInMinutes <= 17)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2: {
                if (moderateWorkoutInMinutes <= 6)
                    return 0;
                else if (moderateWorkoutInMinutes <= 13)
                    return 1;
                else if (moderateWorkoutInMinutes <= 20)
                    return 2;
                else
                    return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (moderateWorkoutInMinutes <= 10)
                    return 0;
                else if (moderateWorkoutInMinutes <= 20)
                    return 1;
                else if (moderateWorkoutInMinutes <= 30)
                    return 2;
                else
                    return 3;
            }
        }
    }
    calculateHardWorkout(mode, hardWorkout, multiplier) {
        if (!hardWorkout)
            return 0;
        const hardWorkoutInMinutes = hardWorkout / multiplier;
        switch (mode) {
            case WeightMode.GAIN: {
                if (hardWorkoutInMinutes <= 4)
                    return 0;
                else if (hardWorkoutInMinutes <= 8 || hardWorkoutInMinutes >= 17)
                    return 1;
                else if (hardWorkoutInMinutes <= 12)
                    return 2;
                else
                    return 3;
            }
            case WeightMode.KEEPING:
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2: {
                if (hardWorkoutInMinutes <= 4)
                    return 0;
                else if (hardWorkoutInMinutes <= 8)
                    return 1;
                else if (hardWorkoutInMinutes <= 12)
                    return 2;
                else
                    return 3;
            }
            case WeightMode['LOSS_3.3']: {
                if (hardWorkoutInMinutes <= 4)
                    return 0;
                else if (hardWorkoutInMinutes <= 9)
                    return 1;
                else if (hardWorkoutInMinutes <= 13)
                    return 2;
                else
                    return 3;
            }
        }
    }
    calculateSleep(mode, sleep, multiplier) {
        if (!sleep)
            return 0;
        const sleepInMinutes = sleep / multiplier;
        switch (mode) {
            case WeightMode.GAIN:
            case WeightMode.KEEPING:
            case WeightMode.LOSS_1:
            case WeightMode.LOSS_2:
            case WeightMode['LOSS_3.3']: {
                if (sleepInMinutes <= 299)
                    return 0;
                else if (sleepInMinutes <= 359)
                    return 1;
                else if (sleepInMinutes <= 419 || sleepInMinutes >= 541)
                    return 2;
                else
                    return 3;
            }
            default: return 0;
        }
    }
    calculateRestingHeartRate(heartRate, gender, age) {
        if (!heartRate)
            return 0;
        if (age <= 25) {
            if (gender === GenderType_1.GenderType.MALE) {
                if (heartRate >= 82)
                    return 0;
                else if (heartRate <= 48 || heartRate >= 70 && heartRate <= 81)
                    return 1;
                else if (heartRate >= 62 && heartRate <= 69)
                    return 2;
                return 3;
            }
            else {
                if (heartRate >= 85)
                    return 0;
                else if (heartRate <= 53 || heartRate >= 73 && heartRate <= 82)
                    return 1;
                else if (heartRate >= 66 && heartRate <= 73)
                    return 2;
                return 3;
            }
        }
        else if (age <= 35) {
            if (gender === GenderType_1.GenderType.MALE) {
                if (heartRate >= 82)
                    return 0;
                else if (heartRate <= 48 || heartRate >= 71 && heartRate <= 81)
                    return 1;
                else if (heartRate >= 62 && heartRate <= 70)
                    return 2;
                return 3;
            }
            else {
                if (heartRate >= 83)
                    return 0;
                else if (heartRate <= 53 || heartRate >= 73 && heartRate <= 82)
                    return 1;
                else if (heartRate >= 65 && heartRate <= 72)
                    return 2;
                return 3;
            }
        }
        else if (age <= 45) {
            if (gender === GenderType_1.GenderType.MALE) {
                if (heartRate >= 83)
                    return 0;
                else if (heartRate <= 49 || heartRate >= 71 && heartRate <= 82)
                    return 1;
                else if (heartRate >= 63 && heartRate <= 70)
                    return 2;
                return 3;
            }
            else {
                if (heartRate >= 84)
                    return 0;
                else if (heartRate <= 53 || heartRate >= 74 && heartRate <= 83)
                    return 1;
                else if (heartRate >= 66 && heartRate <= 73)
                    return 2;
                return 3;
            }
        }
        else if (age <= 55) {
            if (gender === GenderType_1.GenderType.MALE) {
                if (heartRate >= 82)
                    return 0;
                else if (heartRate <= 50 || heartRate >= 72 && heartRate <= 81)
                    return 1;
                else if (heartRate >= 62 && heartRate <= 71)
                    return 2;
                return 3;
            }
            else {
                if (heartRate >= 84)
                    return 0;
                else if (heartRate <= 53 || heartRate >= 74 && heartRate <= 83)
                    return 1;
                else if (heartRate >= 65 && heartRate <= 73)
                    return 2;
                return 3;
            }
        }
        else if (age <= 65) {
            if (gender === GenderType_1.GenderType.MALE) {
                if (heartRate >= 82)
                    return 0;
                else if (heartRate <= 50 || heartRate >= 72 && heartRate <= 81)
                    return 1;
                else if (heartRate >= 62 && heartRate <= 71)
                    return 2;
                return 3;
            }
            else {
                if (heartRate >= 84)
                    return 0;
                else if (heartRate <= 53 || heartRate >= 74 && heartRate <= 83)
                    return 1;
                else if (heartRate >= 65 && heartRate <= 73)
                    return 2;
                return 3;
            }
        }
        else {
            if (gender === GenderType_1.GenderType.MALE) {
                if (heartRate >= 80)
                    return 0;
                else if (heartRate <= 49 || heartRate >= 70 && heartRate <= 79)
                    return 1;
                else if (heartRate >= 62 && heartRate <= 69)
                    return 2;
                return 3;
            }
            else {
                if (heartRate >= 84)
                    return 0;
                else if (heartRate <= 53 || heartRate >= 73 && heartRate <= 84)
                    return 1;
                else if (heartRate >= 65 && heartRate <= 72)
                    return 2;
                return 3;
            }
        }
    }
};
GenerateDailyScore = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(1, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(2, (0, common_1.Inject)(HealthProviderPort_1.HealthProviderPortType)),
    __metadata("design:paramtypes", [Object, Object, Object, UpdateProviderInformation_1.UpdateProviderInformation])
], GenerateDailyScore);
exports.GenerateDailyScore = GenerateDailyScore;
//# sourceMappingURL=GenerateDailyScore.js.map