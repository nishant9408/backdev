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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const Logger_1 = require("../../../../configuration/Logger");
const AuthTokenResponse_1 = require("../../../../primaryAdapters/rest/auth/data/response/AuthTokenResponse");
const MailerProvider_1 = require("../../../ports/MailerProvider");
const UserRegistrationService_1 = require("../../../user/application/services/UserRegistrationService");
const User_1 = require("../../../user/domain/data/User");
const UserRepository_1 = require("../../../user/port/UserRepository");
const AccessTokenRepository_1 = require("../../port/AccessTokenRepository");
const AuthTokenRetriever_1 = require("../../port/AuthTokenRetriever");
const RefreshTokenRepository_1 = require("../../port/RefreshTokenRepository");
const AuthUser_1 = require("../data/internal/AuthUser");
let AuthService = class AuthService {
    constructor(accessTokenRepository, refreshTokenRepository, userRegistrationService, userRepository, mailerProvider, oauth) {
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRegistrationService = userRegistrationService;
        this.userRepository = userRepository;
        this.mailerProvider = mailerProvider;
        this.oauth = oauth;
    }
    registration(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            return yield this.userRegistrationService.registration(userData);
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTokenFromRequest(request, response);
            Logger_1.default.info(`User [id: ${token.userId}] logged in`);
            return AuthTokenResponse_1.AuthTokenResponse.fromObject({
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            });
        });
    }
    refreshLogin(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTokenFromRequest(request, response);
            Logger_1.default.info(`User [id: ${token.userId}] refreshed token`);
            return AuthTokenResponse_1.AuthTokenResponse.fromObject({
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            });
        });
    }
    logout(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenToUpdate = yield this.accessTokenRepository.findAccessTokenData(accessToken);
            if (!accessTokenToUpdate) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const refreshTokenToUpdate = yield this.refreshTokenRepository.findRefreshTokenData(accessTokenToUpdate.refreshToken);
            if (!refreshTokenToUpdate) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const updatedAccessToken = this.disableToken(accessTokenToUpdate);
            const updatedRefreshToken = this.disableToken(refreshTokenToUpdate);
            yield Promise.all([
                this.accessTokenRepository.save(updatedAccessToken),
                this.refreshTokenRepository.save(updatedRefreshToken),
            ]);
            return true;
        });
    }
    getAuthUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenData = yield this.accessTokenRepository.findAccessTokenData(accessToken);
            if (!accessTokenData || !accessTokenData.isActive) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            if (this.isTokenExpired(accessTokenData.expires)) {
                throw new common_1.UnauthorizedException('Token is expired');
            }
            return AuthUser_1.AuthUser.fromObject({
                userId: accessTokenData.userId,
                accessToken: accessTokenData.accessToken,
            });
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            const newPass = this.generateRandom(3);
            const textForEmail = this.getTextForResetPassword(user.name, newPass);
            yield Promise.all([
                this.mailerProvider.sendEmail(email, textForEmail),
                this.updateUserPassword(user, newPass),
                this.disableUserTokens(user.id),
            ]);
        });
    }
    updateUserPassword(user, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedPass = yield argon2.hash(newPass);
            const userToUpdate = User_1.User.fromObject(Object.assign(Object.assign({}, user), { password: encodedPass }));
            return yield this.userRepository.save(userToUpdate);
        });
    }
    getTextForResetPassword(username, newPassword) {
        return `
                Hi ${username},

                You asked us to reset your password. Please, find your new password: ${newPassword}
                `;
    }
    generateRandom(substring) {
        return Math.random().toString(36).substring(substring);
    }
    disableUserTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.disableAccessTokens(userId),
                this.disableRefreshTokens(userId),
            ]);
        });
    }
    getTokenFromRequest(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                request.body.username = request.body.email;
                return yield this.oauth.getToken(request, response);
            }
            catch (e) {
                throw new common_1.UnauthorizedException(e.message);
            }
        });
    }
    isTokenExpired(expires) {
        const currentTime = new Date().valueOf();
        const expiresTime = new Date(expires).valueOf();
        return currentTime > expiresTime;
    }
    disableAccessTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokensToUpdate = yield this.accessTokenRepository.findAccessTokenListByUserId(userId);
            const updatedTokens = tokensToUpdate.map(token => this.disableToken(token));
            yield this.accessTokenRepository.saveList(updatedTokens);
        });
    }
    disableRefreshTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokensToUpdate = yield this.refreshTokenRepository.findRefreshTokenListByUserId(userId);
            const updatedTokens = tokensToUpdate.map(token => this.disableToken(token));
            yield this.refreshTokenRepository.saveList(updatedTokens);
        });
    }
    disableToken(token) {
        return Object.assign(Object.assign({}, token), { isActive: false });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(AccessTokenRepository_1.AccessTokenRepositoryType)),
    __param(1, (0, common_1.Inject)(RefreshTokenRepository_1.RefreshTokenRepositoryType)),
    __param(3, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(4, (0, common_1.Inject)(MailerProvider_1.MailerProviderType)),
    __param(5, (0, common_1.Inject)(AuthTokenRetriever_1.AuthModelType)),
    __metadata("design:paramtypes", [Object, Object, UserRegistrationService_1.UserRegistrationService, Object, Object, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map