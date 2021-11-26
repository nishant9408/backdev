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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const AuthService_1 = require("../../../../core/auth/application/services/AuthService");
const AccessTokenRepository_1 = require("../../../../core/auth/port/AccessTokenRepository");
const UserRepository_1 = require("../../../../core/user/port/UserRepository");
let AuthGuard = class AuthGuard {
    constructor(userRepository, accessTokenRepository, authService) {
        this.userRepository = userRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.authService = authService;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const authorizationValue = request.headers.authorization;
            if (!authorizationValue) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const bearerToken = authorizationValue.split(' ')[1];
            if (!bearerToken) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            request.user = yield this.authService.getAuthUser(bearerToken);
            return true;
        });
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(1, (0, common_1.Inject)(AccessTokenRepository_1.AccessTokenRepositoryType)),
    __param(2, (0, common_1.Inject)(AuthService_1.AuthService)),
    __metadata("design:paramtypes", [Object, Object, AuthService_1.AuthService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map