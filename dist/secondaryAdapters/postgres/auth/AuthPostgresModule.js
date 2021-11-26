"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPostgresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const AccessTokenRepository_1 = require("../../../core/auth/port/AccessTokenRepository");
const AuthClientRepository_1 = require("../../../core/auth/port/AuthClientRepository");
const RefreshTokenRepository_1 = require("../../../core/auth/port/RefreshTokenRepository");
const UserPostgresModule_1 = require("../user/UserPostgresModule");
const AccessTokenEntity_1 = require("./data/AccessTokenEntity");
const AuthClientEntity_1 = require("./data/AuthClientEntity");
const RefreshTokenEntity_1 = require("./data/RefreshTokenEntity");
const AccessTokenRepositoryAdapter_1 = require("./repository/AccessTokenRepositoryAdapter");
const AuthClientRepositoryAdapter_1 = require("./repository/AuthClientRepositoryAdapter");
const RefreshTokenRepositoryAdapter_1 = require("./repository/RefreshTokenRepositoryAdapter");
let AuthPostgresModule = class AuthPostgresModule {
};
AuthPostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                AccessTokenEntity_1.AccessTokenEntity,
                RefreshTokenEntity_1.RefreshTokenEntity,
                AuthClientEntity_1.AuthClientEntity,
            ]),
            UserPostgresModule_1.UserPostgresModule,
        ],
        providers: [
            {
                provide: AccessTokenRepository_1.AccessTokenRepositoryType,
                useClass: AccessTokenRepositoryAdapter_1.AccessTokenRepositoryAdapter,
            },
            {
                provide: AuthClientRepository_1.AuthClientRepositoryType,
                useClass: AuthClientRepositoryAdapter_1.AuthClientRepositoryAdapter,
            },
            {
                provide: RefreshTokenRepository_1.RefreshTokenRepositoryType,
                useClass: RefreshTokenRepositoryAdapter_1.RefreshTokenRepositoryAdapter,
            },
        ],
        exports: [
            AccessTokenRepository_1.AccessTokenRepositoryType,
            AuthClientRepository_1.AuthClientRepositoryType,
            RefreshTokenRepository_1.RefreshTokenRepositoryType,
        ],
    })
], AuthPostgresModule);
exports.AuthPostgresModule = AuthPostgresModule;
//# sourceMappingURL=AuthPostgresModule.js.map