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
exports.InitDailyPushes = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const Logger_1 = require("../../configuration/Logger");
const NotificationService_1 = require("../ports/NotificationService");
const Repository_1 = require("../ports/Repository");
const UserRepository_1 = require("../user/port/UserRepository");
const ScheduleDailyScorePushes_1 = require("./ScheduleDailyScorePushes");
const ScheduleFitbitPulling_1 = require("./ScheduleFitbitPulling");
const ScheduleSilentDailyPushes_1 = require("./ScheduleSilentDailyPushes");
let InitDailyPushes = class InitDailyPushes {
    constructor(notificationService, userRepositoryType, notificationServiceType, repositoryAdapter, scheduleDailyScorePushes, scheduleSilentDailyScorePushes, scheduleFitbitPulling) {
        this.notificationService = notificationService;
        this.userRepositoryType = userRepositoryType;
        this.notificationServiceType = notificationServiceType;
        this.repositoryAdapter = repositoryAdapter;
        this.scheduleDailyScorePushes = scheduleDailyScorePushes;
        this.scheduleSilentDailyScorePushes = scheduleSilentDailyScorePushes;
        this.scheduleFitbitPulling = scheduleFitbitPulling;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepositoryType.findNotifiable();
            for (const { id, timezone, notificationToken } of users) {
                const dto = { userId: id, timezone, notificationToken: notificationToken };
                yield Promise.all([
                    this.scheduleDailyScorePushes.execute(dto),
                    this.scheduleSilentDailyScorePushes.execute(dto),
                ]).catch((e) => {
                    Logger_1.default.info(e);
                });
            }
            let fitbitUsers = yield this.repositoryAdapter.getFitbitProviders();
            fitbitUsers = fitbitUsers.filter(u => u.accessToken);
            const usersWithFitbit = yield Promise.all(fitbitUsers.map(u => this.userRepositoryType.findById(u.uId)));
            const promises = [];
            for (const user of usersWithFitbit) {
                if (!user)
                    continue;
                const { id, timezone } = user;
                if (id && timezone) {
                    yield this.scheduleFitbitPulling.execute(id, timezone).catch((e) => {
                        Logger_1.default.info(e);
                    });
                }
            }
            yield Promise.all(promises);
        });
    }
};
__decorate([
    (0, schedule_1.Timeout)(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InitDailyPushes.prototype, "execute", null);
InitDailyPushes = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(NotificationService_1.NotificationServiceType)),
    __param(1, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(2, (0, common_1.Inject)(NotificationService_1.NotificationServiceType)),
    __param(3, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, ScheduleDailyScorePushes_1.ScheduleDailyScorePushes,
        ScheduleSilentDailyPushes_1.ScheduleSilentDailyPushes,
        ScheduleFitbitPulling_1.ScheduleFitbitPulling])
], InitDailyPushes);
exports.InitDailyPushes = InitDailyPushes;
//# sourceMappingURL=InitDailyPushes.js.map