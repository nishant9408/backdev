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
exports.ScheduleFitbitPulling = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
const Config_1 = require("../../configuration/config/Config");
const Logger_1 = require("../../configuration/Logger");
const Repository_1 = require("../ports/Repository");
const GenerateDailyScore_1 = require("./GenerateDailyScore");
let ScheduleFitbitPulling = class ScheduleFitbitPulling {
    constructor(repositoryAdapter, schedulerRegistry, generateDailyScore) {
        this.repositoryAdapter = repositoryAdapter;
        this.schedulerRegistry = schedulerRegistry;
        this.generateDailyScore = generateDailyScore;
    }
    execute(userId, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.createPush(userId, timezone);
            const jobName = `${userId}-fitbit-data-pull`;
            this.runJob(job, jobName);
            Logger_1.default.info({ userId }, 'daily fitbit data pull init success');
        });
    }
    runJob(job, jobName) {
        try {
            this.schedulerRegistry.addCronJob(jobName, job);
            job.start();
        }
        catch (e) {
            this.schedulerRegistry.deleteCronJob(jobName);
            this.schedulerRegistry.addCronJob(jobName, job);
            job.start();
        }
    }
    createPush(userId, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = Config_1.default.jobs.dailyScoreNotifications.silentTime;
            const onComplete = null;
            const start = false;
            return new cron_1.CronJob(time, () => this.generateDailyScore.execute({ userId }), onComplete, start, timezone);
        });
    }
};
ScheduleFitbitPulling = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object, schedule_1.SchedulerRegistry,
        GenerateDailyScore_1.GenerateDailyScore])
], ScheduleFitbitPulling);
exports.ScheduleFitbitPulling = ScheduleFitbitPulling;
//# sourceMappingURL=ScheduleFitbitPulling.js.map