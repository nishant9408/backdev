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
exports.ScheduleTargetScorePushes = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
const Config_1 = require("../../configuration/config/Config");
const Logger_1 = require("../../configuration/Logger");
const NotificationService_1 = require("../ports/NotificationService");
const Repository_1 = require("../ports/Repository");
const SendTargetScorePush_1 = require("./SendTargetScorePush");
let ScheduleTargetScorePushes = class ScheduleTargetScorePushes {
    constructor(notificationServiceAdapter, repositoryAdapter, schedulerRegistry, sendTargetScorePush) {
        this.notificationServiceAdapter = notificationServiceAdapter;
        this.repositoryAdapter = repositoryAdapter;
        this.schedulerRegistry = schedulerRegistry;
        this.sendTargetScorePush = sendTargetScorePush;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request;
            const jobName = `${userId}-target-score-push`;
            const job = yield this.createPush(request, jobName);
            this.runJob(job, jobName);
            Logger_1.default.info({ userId }, 'target score push init success');
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
    createPush(data, jobName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, notificationToken, timezone } = data;
            const time = Config_1.default.jobs.targetScoreNotifications.time;
            const onComplete = null;
            const start = false;
            return new cron_1.CronJob(time, () => this.sendTargetScorePush.execute(userId, notificationToken, jobName), onComplete, start, timezone);
        });
    }
};
ScheduleTargetScorePushes = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(NotificationService_1.NotificationServiceType)),
    __param(1, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object, Object, schedule_1.SchedulerRegistry,
        SendTargetScorePush_1.SendTargetScorePush])
], ScheduleTargetScorePushes);
exports.ScheduleTargetScorePushes = ScheduleTargetScorePushes;
//# sourceMappingURL=ScheduleTargetScorePushes.js.map