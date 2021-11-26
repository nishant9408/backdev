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
exports.SendTargetScorePush = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const Notification_1 = require("../data/Notification");
const NotificationType_1 = require("../data/NotificationType");
const NotificationService_1 = require("../ports/NotificationService");
const Repository_1 = require("../ports/Repository");
const TargetScoreRepository_1 = require("../ports/TargetScoreRepository");
let SendTargetScorePush = class SendTargetScorePush {
    constructor(notificationServiceAdapter, repositoryAdapter, targetScoreRepository, schedulerRegistry) {
        this.notificationServiceAdapter = notificationServiceAdapter;
        this.repositoryAdapter = repositoryAdapter;
        this.targetScoreRepository = targetScoreRepository;
        this.schedulerRegistry = schedulerRegistry;
    }
    execute(userId, notificationToken, jobName) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetScores = yield this.targetScoreRepository.getTargetScoresByUserId(userId);
            if (!targetScores.length)
                throw new common_1.InternalServerErrorException('no target score');
            const lastTargetScore = targetScores[0];
            const progress = lastTargetScore.monthlyScore >= 7 ? 'on' : 'off';
            const notification = Notification_1.Notification.fromObject({
                token: notificationToken,
                title: '✨Hey! Get your Monthly Score',
                body: `Based on your monthly activity, you are ${progress} your target. Your monthly healthy score is ${lastTargetScore.monthlyScore}. Tap to see more details...`,
                data: {
                    notificationType: NotificationType_1.NotificationType.TARGET,
                },
            });
            yield this.notificationServiceAdapter.send(notification);
            if (jobName) {
                this.schedulerRegistry.deleteCronJob(jobName);
            }
        });
    }
};
SendTargetScorePush = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(NotificationService_1.NotificationServiceType)),
    __param(1, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(2, (0, common_1.Inject)(TargetScoreRepository_1.TargetScoreRepositoryType)),
    __metadata("design:paramtypes", [Object, Object, Object, schedule_1.SchedulerRegistry])
], SendTargetScorePush);
exports.SendTargetScorePush = SendTargetScorePush;
//# sourceMappingURL=SendTargetScorePush.js.map