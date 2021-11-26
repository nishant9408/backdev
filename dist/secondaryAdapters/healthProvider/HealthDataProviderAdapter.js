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
exports.HealthDataProviderAdapter = void 0;
const common_1 = require("@nestjs/common");
const Health_1 = require("../../core/data/Health");
const HealthProvider_1 = require("../../core/data/HealthProvider");
const HealthProviderName_1 = require("../../core/data/HealthProviderName");
const FitbitClient_1 = require("./FitbitClient");
let HealthDataProviderAdapter = class HealthDataProviderAdapter {
    constructor(fitbit) {
        this.fitbit = fitbit;
    }
    subscribeOnActivities(data) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (data.name) {
                case HealthProviderName_1.HealthProviderName.FITBIT:
                    break;
                default:
                    break;
            }
        });
    }
    getHealthData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let healthData;
            switch (data.name) {
                case HealthProviderName_1.HealthProviderName.FITBIT: {
                    if (!data.accessToken || !data.refreshToken || !data.userId) {
                        throw new common_1.BadRequestException('Provider auth data required');
                    }
                    healthData = yield this.fitbit.getUserData(data.accessToken, data.timezone);
                    break;
                }
                default:
                    healthData = Object(null);
            }
            return {
                health: Health_1.Health.fromObject(Object.assign({ userId: data.userId }, healthData)),
                timezone: healthData.timezone,
            };
        });
    }
    isAccessTokenValid(data) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (data.name) {
                case HealthProviderName_1.HealthProviderName.FITBIT:
                    return yield this.fitbit.isAccessTokenValid(data.accessToken);
                default:
                    return true;
            }
        });
    }
    refreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (data.name) {
                case HealthProviderName_1.HealthProviderName.FITBIT: {
                    const refreshed = yield this.fitbit.refreshAccessToken(data);
                    const updated = HealthProvider_1.HealthProvider.fromObject(Object.assign(Object.assign({}, data), refreshed));
                    return updated;
                }
                default: {
                    return data;
                }
            }
        });
    }
    getTodayLastActivity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (data.name) {
                case HealthProviderName_1.HealthProviderName.FITBIT: {
                    const result = yield this.fitbit.getDailyActivities(data.uId, data.accessToken);
                    const activities = result.activities;
                    if (!(activities === null || activities === void 0 ? void 0 : activities.length))
                        return null;
                    return activities[activities.length - 1];
                }
                default: {
                    return null;
                }
            }
        });
    }
    getDailyStats(data) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (data.name) {
                case HealthProviderName_1.HealthProviderName.FITBIT: {
                    return yield this.fitbit.getDailyStats(data.accessToken, data.timezone);
                }
                default: {
                    return null;
                }
            }
        });
    }
};
HealthDataProviderAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [FitbitClient_1.FitbitClient])
], HealthDataProviderAdapter);
exports.HealthDataProviderAdapter = HealthDataProviderAdapter;
//# sourceMappingURL=HealthDataProviderAdapter.js.map