"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.FitbitClient = void 0;
const common_1 = require("@nestjs/common");
const https_1 = require("https");
const moment = require("moment");
const queryString = require("query-string");
const Config_1 = require("../../configuration/config/Config");
const Logger_1 = require("../../configuration/Logger");
const GenderType_1 = require("../../core/data/GenderType");
const FitbitAuth_1 = require("./data/FitbitAuth");
let FitbitClient = class FitbitClient {
    getDailyActivities(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: 'api.fitbit.com',
                path: `/1/user/${userId}/activities/date/today.json`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return yield this.makeRequest(options);
        });
    }
    isAccessTokenValid(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield this.makeRequest(options, body);
            if (result['error']) {
                throw new common_1.InternalServerErrorException('fitbit problems');
            }
            return result['active'] || false;
        });
    }
    refreshAccessToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.info({
                message: 'Starting',
                method: 'refreshAccessToken',
                data,
            });
            const strToEncode = `${Config_1.default.fitbit.clientId}:${Config_1.default.fitbit.clientSecret}`;
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
            const result = yield this.makeRequest(options);
            Logger_1.default.info({
                message: 'Result',
                result,
                method: 'refreshAccessToken',
                data,
            });
            return FitbitAuth_1.FitbitAuth.fromObject(result);
        });
    }
    getUserData(accessToken, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileData = yield this.getProfileData(accessToken);
            const data = yield Promise.all([
                this.getActivities(accessToken, profileData.timezone || timezone),
                this.getSteps(accessToken, profileData.timezone || timezone),
            ]);
            const res = data
                .filter(obj => !obj['error'])
                .reduce((acc, val) => (Object.assign(Object.assign({}, acc), val)), {});
            return {
                timezone: profileData.user.timezone,
                dateOfBirth: profileData.user.dateOfBirth,
                gender: profileData.user.gender === 'MALE' ? GenderType_1.GenderType.MALE : GenderType_1.GenderType.FEMALE,
                workoutCount: res.activities.length,
                stepCount: res['activities-steps'].reduce((acc, v) => acc + parseInt(v['value'], 10), 0),
            };
        });
    }
    getProfileData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: 'api.fitbit.com',
                path: '/1/user/-/profile.json',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return yield this.makeRequest(options);
        });
    }
    getDailyStats(accessToken, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            const daysToSubtract = 1;
            const date = this.generateDateForActivity(daysToSubtract, timezone);
            const responses = yield Promise.all([
                this.getStepsAndCaloriesForSpecifiedDate(accessToken, date),
                this.getSleepForSpecifiedDate(accessToken, date),
                this.getHeartRateForSpecifiedDate(accessToken, date),
            ]);
            return responses.reduce((acc, obj) => (Object.assign(Object.assign({}, acc), obj)), {});
        });
    }
    getSleepForSpecifiedDate(token, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: 'api.fitbit.com',
                path: `/1/user/-/sleep/date/${date}.json`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const data = yield this.makeRequest(options);
            const sleepInMilliseconds = data.summary.totalMinutesAsleep !== undefined ?
                Math.round(data.summary.totalMinutesAsleep) * 60 * 1000 :
                null;
            return {
                sleep: sleepInMilliseconds,
            };
        });
    }
    getHeartRateForSpecifiedDate(token, date) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: 'api.fitbit.com',
                path: `/1/user/-/activities/heart/date/${date}/1d.json`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const data = yield this.makeRequest(options);
            if (data.errors) {
                Logger_1.default.info({ token, data, method: 'getHeartRateForSpecifiedDate' });
                throw new common_1.InternalServerErrorException(data.errors);
            }
            const zones = ((_b = (_a = data === null || data === void 0 ? void 0 : data['activities-heart'][0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.heartRateZones) || null;
            if (!zones)
                throw new common_1.InternalServerErrorException('getHeartRateForSpecifiedDate error: zones == null');
            const min1 = 60 * 1000;
            const lightWorkout = min1 * zones[1].minutes || 0;
            const moderateWorkout = min1 * zones[2].minutes || 0;
            const hardWorkout = min1 * zones[3].minutes || 0;
            const restingHeartRate = ((_c = data['activities-heart'][0]) === null || _c === void 0 ? void 0 : _c.value.restingHeartRate) || 0;
            const heartRate = this.calculateHeartRate(data);
            return {
                lightWorkout,
                moderateWorkout,
                hardWorkout,
                heartRate,
                restingHeartRate,
            };
        });
    }
    calculateHeartRate(data) {
        var _a, _b;
        const zones = ((_b = (_a = data === null || data === void 0 ? void 0 : data['activities-heart'][0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.heartRateZones) || null;
        if (!zones)
            return 0;
        let commonRate = 0;
        let commonTimeInMin = 0;
        for (const zone of zones) {
            commonRate += Math.round((zone.min + zone.max) / 2 * zone.minutes) || 0;
            commonTimeInMin += zone.minutes || 0;
        }
        const averageHeartRate = Math.round(commonRate / commonTimeInMin);
        return averageHeartRate || 0;
    }
    getStepsAndCaloriesForSpecifiedDate(token, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: 'api.fitbit.com',
                path: `/1/user/-/activities/date/${date}.json`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const min1 = 60 * 1000;
            const data = yield this.makeRequest(options);
            const summary = data.summary;
            const totalActivity = ((summary === null || summary === void 0 ? void 0 : summary.fairlyActiveMinutes) || 0) + ((summary === null || summary === void 0 ? void 0 : summary.veryActiveMinutes) || 0);
            return {
                calories: (summary === null || summary === void 0 ? void 0 : summary.caloriesOut) || 0,
                steps: (summary === null || summary === void 0 ? void 0 : summary.steps) || 0,
                totalActivity: totalActivity * min1,
            };
        });
    }
    getSteps(token, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.makeRequest(options);
        });
    }
    getActivities(token, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const data = yield this.makeRequest(options);
            return { activities: data['activities'] };
        });
    }
    generateDateForActivity(days, timezone) {
        const date = moment.tz(new Date(), timezone).subtract(days, 'days');
        return date.format('YYYY-MM-DD');
    }
    makeRequest(options, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                const req = (0, https_1.request)(options, resp => {
                    let data = '';
                    resp.on('data', chunk => data += chunk);
                    resp.on('end', () => resolve(JSON.parse(data)));
                }).on('error', e => reject(e));
                if (body)
                    req.write(body);
                req.end();
            });
        });
    }
};
FitbitClient = __decorate([
    (0, common_1.Injectable)()
], FitbitClient);
exports.FitbitClient = FitbitClient;
//# sourceMappingURL=FitbitClient.js.map