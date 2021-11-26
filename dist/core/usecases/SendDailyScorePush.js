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
exports.SendDailyScorePush = void 0;
const common_1 = require("@nestjs/common");
const Logger_1 = require("../../configuration/Logger");
const Notification_1 = require("../data/Notification");
const NotificationType_1 = require("../data/NotificationType");
const NotificationService_1 = require("../ports/NotificationService");
const Repository_1 = require("../ports/Repository");
const UserRepository_1 = require("../user/port/UserRepository");
let SendDailyScorePush = class SendDailyScorePush {
    constructor(notificationServiceAdapter, repositoryAdapter, userRepoAdapter) {
        this.notificationServiceAdapter = notificationServiceAdapter;
        this.repositoryAdapter = repositoryAdapter;
        this.userRepoAdapter = userRepoAdapter;
    }
    execute(userId, notificationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.info({ userId, notificationToken, message: 'SendDailyScorePush.execute' });
            const scoreData = yield this.repositoryAdapter.getDailyScoreByUserId(userId);
            if (!notificationToken.length) {
                const user = yield this.userRepoAdapter.findById(userId);
                if (!(user === null || user === void 0 ? void 0 : user.notificationToken.length)) {
                    Logger_1.default.error({ userId, message: 'no notification token to send push' });
                    return;
                }
            }
            if (!scoreData || scoreData.score === null) {
                Logger_1.default.error({ userId, message: 'no score to send push' });
                return;
            }
            const progress = scoreData.score >= 7 ? 'on' : 'off';
            const notification = Notification_1.Notification.fromObject({
                token: notificationToken,
                title: '✨Hey! Get your Daily Booster',
                body: `Based on your activity, you are ${progress} your target. Your daily healthy score is ${scoreData.score}. Tap to see more details...`,
                data: {
                    notificationType: NotificationType_1.NotificationType.BOOSTER,
                },
            });
            Logger_1.default.info({ userId, notification, message: 'SendDailyScorePush.execute' });
            yield this.notificationServiceAdapter.send(notification);
        });
    }
};
SendDailyScorePush = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(NotificationService_1.NotificationServiceType)),
    __param(1, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(2, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __metadata("design:paramtypes", [Object, Object, Object])
], SendDailyScorePush);
exports.SendDailyScorePush = SendDailyScorePush;
//# sourceMappingURL=SendDailyScorePush.js.map