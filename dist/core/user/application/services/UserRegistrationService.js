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
exports.UserRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const argon2 = require("argon2");
const Logger_1 = require("../../../../configuration/Logger");
const User_1 = require("../../domain/data/User");
const UserRepository_1 = require("../../port/UserRepository");
const UserResponseMapper_1 = require("./converters/UserResponseMapper");
let UserRegistrationService = class UserRegistrationService {
    constructor(userRepository, responseConverter, schedulerRegistry) {
        this.userRepository = userRepository;
        this.responseConverter = responseConverter;
        this.schedulerRegistry = schedulerRegistry;
    }
    registration(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(data.email);
            if (user) {
                throw new common_1.BadRequestException('This email already registered');
            }
            const encryptedPassword = yield argon2.hash(data.password);
            const newUser = User_1.User.fromObject(Object.assign(Object.assign({}, data), { password: encryptedPassword }));
            const savedUser = yield this.createUser(newUser);
            return this.responseConverter.map(User_1.User.fromObject(Object.assign({}, savedUser)));
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            if (userData.notificationToken) {
                const users = yield this.userRepository.findByNotificationToken(userData.notificationToken);
                for (const user of users) {
                    promises.push(this.userRepository.save(Object.assign(Object.assign({}, user), { notificationToken: '' })));
                    try {
                        this.schedulerRegistry.deleteCronJob(`${user.id}-daily-score-push`);
                        this.schedulerRegistry.deleteCronJob(`${user.id}-silent-daily-score-push`);
                        this.schedulerRegistry.deleteCronJob(`${user.id}-target-score-push`);
                    }
                    catch (e) {
                        Logger_1.default.info({ e });
                    }
                }
            }
            const [newUser] = yield Promise.all([
                this.userRepository.save(userData),
                ...promises,
            ]);
            return newUser;
        });
    }
};
UserRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(1, (0, common_1.Inject)(UserResponseMapper_1.UserResponseMapperType)),
    __metadata("design:paramtypes", [Object, Object, schedule_1.SchedulerRegistry])
], UserRegistrationService);
exports.UserRegistrationService = UserRegistrationService;
//# sourceMappingURL=UserRegistrationService.js.map