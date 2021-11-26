"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthModule = void 0;
const common_1 = require("@nestjs/common");
const OAuth2Server = require("oauth2-server");
const Config_1 = require("../../configuration/config/Config");
const AuthTokenRetriever_1 = require("../../core/auth/port/AuthTokenRetriever");
const UserModule_1 = require("../../core/user/UserModule");
const AuthPostgresModule_1 = require("../postgres/auth/AuthPostgresModule");
const UserPostgresModule_1 = require("../postgres/user/UserPostgresModule");
const OAuthRequestMapper_1 = require("./mappers/OAuthRequestMapper");
const OAuthResponseMapper_1 = require("./mappers/OAuthResponseMapper");
const TokenMapper_1 = require("./mappers/TokenMapper");
const OAuthServerAdapter_1 = require("./OAuthServerAdapter");
const OAuthServerModel_1 = require("./OAuthServerModel");
let OAuthModule = class OAuthModule {
};
OAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [AuthPostgresModule_1.AuthPostgresModule, UserPostgresModule_1.UserPostgresModule, UserModule_1.UserModule],
        providers: [
            {
                provide: OAuthRequestMapper_1.OAuthRequestMapperType,
                useClass: OAuthRequestMapper_1.OAuthRequestMapper,
            }, {
                provide: OAuthResponseMapper_1.OAuthResponseMapperType,
                useClass: OAuthResponseMapper_1.OAuthResponseMapper,
            }, {
                provide: TokenMapper_1.TokenMapperType,
                useClass: TokenMapper_1.TokenMapper,
            }, {
                provide: OAuthServerModel_1.OAuthServerModelType,
                useClass: OAuthServerModel_1.OAuthServerModel,
            }, {
                provide: AuthTokenRetriever_1.AuthModelType,
                useClass: OAuthServerAdapter_1.OAuthServerAdapter,
            }, {
                provide: OAuthServerModel_1.OAuth2ServerType,
                useFactory: (serverModel) => new OAuth2Server({
                    model: serverModel,
                    accessTokenLifetime: Config_1.default.auth.accessTokenLifetime,
                    refreshTokenLifetime: Config_1.default.auth.refreshTokenLifetime,
                }),
                inject: [OAuthServerModel_1.OAuthServerModelType],
            },
        ],
        exports: [
            OAuthServerModel_1.OAuth2ServerType,
            OAuthServerModel_1.OAuthServerModelType,
            AuthTokenRetriever_1.AuthModelType,
        ],
    })
], OAuthModule);
exports.OAuthModule = OAuthModule;
//# sourceMappingURL=OAuthModule.js.map