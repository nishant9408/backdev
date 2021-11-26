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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const AuthUser_1 = require("../../../core/auth/application/data/internal/AuthUser");
const CurrentUser_1 = require("../../../core/auth/decorators/CurrentUser");
const constants_1 = require("../../../core/sharedKernel/constants");
const SendDailyScorePush_1 = require("../../../core/usecases/SendDailyScorePush");
const SendDailySilencePush_1 = require("../../../core/usecases/SendDailySilencePush");
const SendTargetScorePush_1 = require("../../../core/usecases/SendTargetScorePush");
const UserManagementService_1 = require("../../../core/user/application/services/UserManagementService");
const UserQueryService_1 = require("../../../core/user/application/services/UserQueryService");
const AuthGuard_1 = require("../common/guard/AuthGuard");
const UpdateUserInput_1 = require("./data/input/UpdateUserInput");
const UpdateUserPasswordInput_1 = require("./data/input/UpdateUserPasswordInput");
const UserResponse_1 = require("./data/response/UserResponse");
let UserController = class UserController {
    constructor(userService, userManagementService, sendDailySilencePush, sendDailyScorePush, sendTargetScorePush) {
        this.userService = userService;
        this.userManagementService = userManagementService;
        this.sendDailySilencePush = sendDailySilencePush;
        this.sendDailyScorePush = sendDailyScorePush;
        this.sendTargetScorePush = sendTargetScorePush;
    }
    getUser(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUserByIdHandler(authUser.userId);
        });
    }
    updateUser(input, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userManagementService.updateProfile(authUser.userId, input);
        });
    }
    updateUserPassword(input, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userManagementService.updatePassword(authUser.userId, input);
        });
    }
    sendSilencePush(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByIdHandler(authUser.userId);
            return yield this.sendDailySilencePush.execute(user.notificationToken);
        });
    }
    sendDailyBooster(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByIdHandler(authUser.userId);
            return yield this.sendDailyScorePush.execute(authUser.userId, user.notificationToken);
        });
    }
    sendTargetBooster(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByIdHandler(authUser.userId);
            return yield this.sendTargetScorePush.execute(authUser.userId, user.notificationToken);
        });
    }
};
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiOkResponse)({
        description: 'Current user profile information',
        type: UserResponse_1.UserResponse,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: constants_1.UNAUTHORIZED }),
    __param(0, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update user profile',
        type: UserResponse_1.UserResponse,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: constants_1.UNAUTHORIZED }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserInput_1.UpdateUserInput,
        AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('password'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update user password',
        type: UserResponse_1.UserResponse,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: constants_1.UNAUTHORIZED }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserPasswordInput_1.UpdateUserPasswordInput,
        AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPassword", null);
__decorate([
    (0, common_1.Put)('pushes/daily-booster/silent'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: constants_1.UNAUTHORIZED }),
    __param(0, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendSilencePush", null);
__decorate([
    (0, common_1.Put)('pushes/daily-booster'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: constants_1.UNAUTHORIZED }),
    __param(0, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendDailyBooster", null);
__decorate([
    (0, common_1.Put)('pushes/target-score'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: constants_1.UNAUTHORIZED }),
    __param(0, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendTargetBooster", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: constants_1.INTERNAL_ERROR }),
    (0, swagger_1.ApiNotFoundResponse)({ description: constants_1.USER_NOT_FOUND }),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [UserQueryService_1.UserQueryService,
        UserManagementService_1.UserManagementService,
        SendDailySilencePush_1.SendDailySilencePush,
        SendDailyScorePush_1.SendDailyScorePush,
        SendTargetScorePush_1.SendTargetScorePush])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map