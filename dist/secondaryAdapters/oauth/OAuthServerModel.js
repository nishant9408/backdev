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
exports.OAuth2ServerType = exports.OAuthServerModelType = exports.OAuthServerModel = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const R = require("ramda");
const Config_1 = require("../../configuration/config/Config");
const AccessTokenRepository_1 = require("../../core/auth/port/AccessTokenRepository");
const AuthClientRepository_1 = require("../../core/auth/port/AuthClientRepository");
const RefreshTokenRepository_1 = require("../../core/auth/port/RefreshTokenRepository");
const UserRegistrationService_1 = require("../../core/user/application/services/UserRegistrationService");
const UserRepository_1 = require("../../core/user/port/UserRepository");
const UserResponse_1 = require("../../primaryAdapters/rest/user/data/response/UserResponse");
const AccessTokenEntity_1 = require("../postgres/auth/data/AccessTokenEntity");
const RefreshTokenEntity_1 = require("../postgres/auth/data/RefreshTokenEntity");
let OAuthServerModel = class OAuthServerModel {
    constructor(authClientRepository, accessTokenRepository, refreshTokenRepository, userRepository, userRegService) {
        this.authClientRepository = authClientRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.userRegService = userRegService;
    }
    getAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenData = yield this.accessTokenRepository.findAccessTokenData(accessToken);
            if (!accessTokenData || !accessTokenData.isActive) {
                return null;
            }
            return {
                accessToken: accessTokenData.accessToken,
                accessTokenExpiresAt: accessTokenData.expires,
                scope: accessTokenData.scope,
                client: {
                    id: accessTokenData.clientId,
                    grants: [],
                },
                user: {
                    id: accessTokenData.userId,
                },
            };
        });
    }
    saveToken(oauth2Token, oauthClient, oauthUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.saveAccessTokenData(oauth2Token, oauthClient, oauthUser),
                this.saveRefreshTokenData(oauth2Token, oauthClient, oauthUser),
            ]);
            return Object.assign(Object.assign({}, oauth2Token), { client: oauthClient, user: oauthUser });
        });
    }
    getRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenData = yield this.refreshTokenRepository.findRefreshTokenData(refreshToken);
            if (!refreshTokenData) {
                return null;
            }
            return {
                refreshToken: refreshTokenData.refreshToken,
                refreshTokenExpiresAt: refreshTokenData.expires,
                scope: refreshTokenData.scope,
                client: {
                    id: refreshTokenData.clientId,
                    grants: [],
                },
                user: {
                    id: refreshTokenData.userId,
                },
            };
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findByEmail(email);
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return new UserResponse_1.UserResponse();
        });
    }
    getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.userRepository.findByEmail(email);
            if (!userData || !userData.password) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const isPasswordCorrect = yield argon2.verify(userData.password, password);
            if (!isPasswordCorrect) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            return {
                id: userData.id,
            };
        });
    }
    getClient(clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.authClientRepository.findByIdAndSecret(clientId, clientSecret);
            if (!client) {
                return null;
            }
            return {
                id: client.clientId,
                grants: client.grantTypes,
                scope: client.scope,
            };
        });
    }
    validateScope(user, client, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedScope = scope.split(',');
            if (!parsedScope.every((scp) => client.scope.includes(scp))) {
                return null;
            }
            return parsedScope;
        });
    }
    verifyScope(token, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            return R.equals(token.scope, scope);
        });
    }
    revokeToken(refreshTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = refreshTokenData;
            const refreshTokenToUpdate = yield this.refreshTokenRepository.findRefreshTokenData(refreshToken);
            const accessTokenToUpdate = yield this.accessTokenRepository.findAccessTokenByRefreshToken(refreshToken);
            if (!refreshTokenToUpdate || !accessTokenToUpdate) {
                return false;
            }
            accessTokenToUpdate.isActive = false;
            refreshTokenToUpdate.isActive = false;
            yield Promise.all([this.accessTokenRepository.save(accessTokenToUpdate), this.refreshTokenRepository.save(refreshTokenToUpdate)]);
            return true;
        });
    }
    saveAccessTokenData(oauthToken, oauthClient, oauthUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenToSave = AccessTokenEntity_1.AccessTokenEntity.fromObject({
                accessToken: oauthToken.accessToken,
                refreshToken: oauthToken.refreshToken,
                expires: oauthToken.accessTokenExpiresAt || new Date(Date.now() + Config_1.default.auth.accessTokenLifetime * 1000),
                clientId: oauthClient.id,
                scope: oauthToken.scope,
                userId: oauthUser.id,
            });
            return yield this.accessTokenRepository.save(accessTokenToSave);
        });
    }
    saveRefreshTokenData(oauthToken, oauthClient, oauthUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!oauthToken.refreshToken) {
                return false;
            }
            const refreshTokenToSave = RefreshTokenEntity_1.RefreshTokenEntity.fromObject({
                refreshToken: oauthToken.refreshToken,
                expires: oauthToken.refreshTokenExpiresAt || new Date(Date.now() + Config_1.default.auth.refreshTokenLifetime * 1000),
                clientId: oauthClient.id,
                scope: oauthToken.scope,
                userId: oauthUser.id,
            });
            return yield this.refreshTokenRepository.save(refreshTokenToSave);
        });
    }
};
OAuthServerModel = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(AuthClientRepository_1.AuthClientRepositoryType)),
    __param(1, (0, common_1.Inject)(AccessTokenRepository_1.AccessTokenRepositoryType)),
    __param(2, (0, common_1.Inject)(RefreshTokenRepository_1.RefreshTokenRepositoryType)),
    __param(3, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, UserRegistrationService_1.UserRegistrationService])
], OAuthServerModel);
exports.OAuthServerModel = OAuthServerModel;
const OAuthServerModelType = Symbol.for('OAuthServerModel');
exports.OAuthServerModelType = OAuthServerModelType;
const OAuth2ServerType = Symbol.for('OAuth2Server');
exports.OAuth2ServerType = OAuth2ServerType;
//# sourceMappingURL=OAuthServerModel.js.map