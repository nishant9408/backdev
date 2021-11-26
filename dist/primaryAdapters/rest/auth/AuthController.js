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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const swagger_1 = require("@nestjs/swagger");
const Logger_1 = require("../../../configuration/Logger");
const AuthUser_1 = require("../../../core//auth/application/data/internal/AuthUser");
const AuthService_1 = require("../../../core//auth/application/services/AuthService");
const CurrentUser_1 = require("../../../core//auth/decorators/CurrentUser");
const HealthProvider_1 = require("../../../core/data/HealthProvider");
const HealthProviderName_1 = require("../../../core/data/HealthProviderName");
const Repository_1 = require("../../../core/ports/Repository");
const constants_1 = require("../../../core/sharedKernel/constants");
const router_1 = require("../../../core/sharedKernel/router");
const ScheduleDailyScorePushes_1 = require("../../../core/usecases/ScheduleDailyScorePushes");
const ScheduleFitbitPulling_1 = require("../../../core/usecases/ScheduleFitbitPulling");
const ScheduleSilentDailyPushes_1 = require("../../../core/usecases/ScheduleSilentDailyPushes");
const UserQueryService_1 = require("../../../core/user/application/services/UserQueryService");
const AuthGuard_1 = require("../common/guard/AuthGuard");
const OpenAuthGuard_1 = require("../common/guard/OpenAuthGuard");
const ExpressRequestMapper_1 = require("../common/mappers/ExpressRequestMapper");
const ExpressResponseMapper_1 = require("../common/mappers/ExpressResponseMapper");
const LoginInput_1 = require("./data/input/LoginInput");
const RefreshInput_1 = require("./data/input/RefreshInput");
const RegistrationInput_1 = require("./data/input/RegistrationInput");
const ResetPassword_1 = require("./data/input/ResetPassword");
const AuthTokenResponse_1 = require("./data/response/AuthTokenResponse");
let AuthController = class AuthController {
    constructor(scheduleDailyScorePushes, scheduleSilentDailyScorePushes, authService, repository, requestMapper, responseMapper, userService, schedulerRegistry, scheduleFitbitPulling) {
        this.scheduleDailyScorePushes = scheduleDailyScorePushes;
        this.scheduleSilentDailyScorePushes = scheduleSilentDailyScorePushes;
        this.authService = authService;
        this.repository = repository;
        this.requestMapper = requestMapper;
        this.responseMapper = responseMapper;
        this.userService = userService;
        this.schedulerRegistry = schedulerRegistry;
        this.scheduleFitbitPulling = scheduleFitbitPulling;
    }
    registrationAndLogin(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, router_1.validateOrThrow)(RegistrationInput_1.RegistrationInput, request);
            const req = this.requestMapper.map(request);
            const res = this.responseMapper.map(response);
            const userData = request.body;
            const user = yield this.authService.registration(req, res);
            const [loginResp] = yield Promise.all([
                this.authService.login(req, res),
                this.scheduleDailyScorePushes.execute({
                    userId: user.id,
                    timezone: userData.timezone,
                    notificationToken: userData.notificationToken,
                }),
                this.scheduleSilentDailyScorePushes.execute({
                    userId: user.id,
                    timezone: userData.timezone,
                    notificationToken: userData.notificationToken,
                }),
                this.repository.saveHealthProviderData(HealthProvider_1.HealthProvider.fromObject({
                    uId: user.id,
                    name: userData.provider.name,
                    timezone: userData.timezone,
                    accessToken: userData.provider.accessToken,
                    refreshToken: userData.provider.refreshToken,
                    expiresIn: userData.provider.expiresIn,
                    scope: userData.scope,
                    userId: userData.provider.userId,
                    tokenType: userData.provider.tokenType,
                })),
            ]);
            if (user.id && user.timezone && userData.provider.name === HealthProviderName_1.HealthProviderName.FITBIT) {
                yield this.scheduleFitbitPulling.execute(user.id, user.timezone);
            }
            (0, router_1.sendResponse)(loginResp, response);
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, router_1.validateOrThrow)(LoginInput_1.LoginInput, request);
            const result = yield this.authService.login(this.requestMapper.map(request), this.responseMapper.map(response));
            const user = yield this.userService.findUserByEmail(request.body.username);
            if (user) {
                yield Promise.all([
                    this.scheduleDailyScorePushes.execute({
                        userId: user.id,
                        timezone: user.timezone,
                        notificationToken: user.notificationToken,
                    }),
                    this.scheduleSilentDailyScorePushes.execute({
                        userId: user.id,
                        timezone: user.timezone,
                        notificationToken: user.notificationToken,
                    }),
                ]);
                Logger_1.default.info({ userId: user.id, message: 'reschedule pushes after login' });
            }
            (0, router_1.sendResponse)(result, response);
        });
    }
    refreshToken(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, router_1.validateOrThrow)(RefreshInput_1.RefreshInput, request);
            const result = yield this.authService.refreshLogin(this.requestMapper.map(request), this.responseMapper.map(response));
            (0, router_1.sendResponse)(result, response);
        });
    }
    logout(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.logout(authUser.accessToken);
            const { userId } = authUser;
            try {
                this.schedulerRegistry.deleteCronJob(`${userId}-daily-score-push`);
                this.schedulerRegistry.deleteCronJob(`${userId}-silent-daily-score-push`);
                this.schedulerRegistry.deleteCronJob(`${userId}-target-score-push`);
                Logger_1.default.info({ userId, message: 'destroyed pushes after logout' });
            }
            catch (e) {
                Logger_1.default.info({ userId, message: 'destroyed pushes after logout' });
                Logger_1.default.info({ e });
            }
        });
    }
    resetUserPassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.resetPassword(input.email);
        });
    }
};
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.UseGuards)(OpenAuthGuard_1.OpenAuthGuard),
    (0, swagger_1.ApiBody)({ description: 'Registration input', type: RegistrationInput_1.RegistrationInput }),
    (0, swagger_1.ApiOkResponse)({ description: 'User has been registered successfully', type: AuthTokenResponse_1.AuthTokenResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registrationAndLogin", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(OpenAuthGuard_1.OpenAuthGuard),
    (0, swagger_1.ApiBody)({ description: 'Login input', type: LoginInput_1.LoginInput }),
    (0, swagger_1.ApiOkResponse)({ description: 'User has been login successfully', type: AuthTokenResponse_1.AuthTokenResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.UseGuards)(OpenAuthGuard_1.OpenAuthGuard),
    (0, swagger_1.ApiBody)({ description: 'Refresh token', type: RefreshInput_1.RefreshInput }),
    (0, swagger_1.ApiOkResponse)({ description: 'Access token has been refreshed successfully', type: AuthTokenResponse_1.AuthTokenResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Delete)('logout'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiOkResponse)({ description: constants_1.SUCCESS }),
    __param(0, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('password/reset'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Reset user password',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPassword_1.ResetPassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetUserPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Registration | Login'),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: constants_1.INTERNAL_ERROR }),
    (0, swagger_1.ApiNotFoundResponse)({ description: constants_1.USER_NOT_FOUND }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({ description: constants_1.NOT_VALID }),
    __param(3, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(4, (0, common_1.Inject)(ExpressRequestMapper_1.ExpressRequestMapperType)),
    __param(5, (0, common_1.Inject)(ExpressResponseMapper_1.ExpressResponseMapperType)),
    __metadata("design:paramtypes", [ScheduleDailyScorePushes_1.ScheduleDailyScorePushes,
        ScheduleSilentDailyPushes_1.ScheduleSilentDailyPushes,
        AuthService_1.AuthService, Object, Object, Object, UserQueryService_1.UserQueryService,
        schedule_1.SchedulerRegistry,
        ScheduleFitbitPulling_1.ScheduleFitbitPulling])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map