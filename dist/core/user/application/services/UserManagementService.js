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
exports.UserManagementService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const argon2 = require("argon2");
const Logger_1 = require("../../../../configuration/Logger");
const ScheduleDailyScorePushes_1 = require("../../../usecases/ScheduleDailyScorePushes");
const ScheduleSilentDailyPushes_1 = require("../../../usecases/ScheduleSilentDailyPushes");
const ScheduleTargetScorePushes_1 = require("../../../usecases/ScheduleTargetScorePushes");
const User_1 = require("../../domain/data/User");
const UserRepository_1 = require("../../port/UserRepository");
const UserResponseMapper_1 = require("./converters/UserResponseMapper");
let UserManagementService = class UserManagementService {
    constructor(userRepository, responseConverter, scheduleDailyScorePushes, scheduleSilentPushes, scheduleTargetScorePushes, schedulerRegistry) {
        this.userRepository = userRepository;
        this.responseConverter = responseConverter;
        this.scheduleDailyScorePushes = scheduleDailyScorePushes;
        this.scheduleSilentPushes = scheduleSilentPushes;
        this.scheduleTargetScorePushes = scheduleTargetScorePushes;
        this.schedulerRegistry = schedulerRegistry;
    }
    updateProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            const userToUpdate = User_1.User.fromObject(Object.assign(Object.assign({}, user), data));
            const promises = [];
            if (data.notificationToken && data.notificationToken.length) {
                Logger_1.default.info({ userId, token: data.notificationToken, message: 'updateProfile' });
                let users = yield this.userRepository.findByNotificationToken(data.notificationToken);
                users = users.filter(u => u.id !== user.id);
                Logger_1.default.info({ userId, token: data.notificationToken, users }, 'updateProfile');
                for (const user of users) {
                    promises.push(this.userRepository.save(Object.assign(Object.assign({}, user), { notificationToken: '' })));
                    try {
                        this.schedulerRegistry.deleteCronJob(`${user.id}-daily-score-push`);
                        this.schedulerRegistry.deleteCronJob(`${user.id}-silent-daily-score-push`);
                        this.schedulerRegistry.deleteCronJob(`${user.id}-target-score-push`);
                        Logger_1.default.info({ userId, token: data.notificationToken, message: 'updateProfile, delete jobs' });
                    }
                    catch (e) {
                        Logger_1.default.info({ userId }, e);
                    }
                }
            }
            if ((data.timezone && data.timezone.length && data.timezone !== user.timezone) ||
                (data.notificationToken && data.notificationToken.length && data.notificationToken !== user.notificationToken)) {
                Logger_1.default.info({ userId, token: data.notificationToken, message: 'Reschedule pushes' });
                const pushInfo = {
                    userId,
                    notificationToken: userToUpdate.notificationToken,
                    timezone: userToUpdate.timezone,
                };
                promises.push(this.scheduleDailyScorePushes.execute(pushInfo));
                promises.push(this.scheduleSilentPushes.execute(pushInfo));
            }
            const [updatedUser] = yield Promise.all([
                this.userRepository.save(userToUpdate),
                ...promises,
            ]);
            Logger_1.default.info({ updatedUser });
            return this.responseConverter.map(updatedUser);
        });
    }
    updatePassword(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            if (!(yield argon2.verify(user.password, data.oldPassword))) {
                throw new common_1.BadRequestException('Your current password is incorrect');
            }
            const updatedUser = yield this.updateUserPassword(user, data.newPassword);
            return this.responseConverter.map(updatedUser);
        });
    }
    updateUserPassword(user, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedPass = yield argon2.hash(newPass);
            const userToUpdate = User_1.User.fromObject(Object.assign(Object.assign({}, user), { password: encodedPass }));
            return yield this.userRepository.save(userToUpdate);
        });
    }
};
UserManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(1, (0, common_1.Inject)(UserResponseMapper_1.UserResponseMapperType)),
    __metadata("design:paramtypes", [Object, Object, ScheduleDailyScorePushes_1.ScheduleDailyScorePushes,
        ScheduleSilentDailyPushes_1.ScheduleSilentDailyPushes,
        ScheduleTargetScorePushes_1.ScheduleTargetScorePushes,
        schedule_1.SchedulerRegistry])
], UserManagementService);
exports.UserManagementService = UserManagementService;
//# sourceMappingURL=UserManagementService.js.map