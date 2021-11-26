"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const ExpressRequestMapper_1 = require("../../primaryAdapters/rest/common/mappers/ExpressRequestMapper");
const ExpressResponseMapper_1 = require("../../primaryAdapters/rest/common/mappers/ExpressResponseMapper");
const MailerModule_1 = require("../../secondaryAdapters/mailer/MailerModule");
const OAuthModule_1 = require("../../secondaryAdapters/oauth/OAuthModule");
const AuthPostgresModule_1 = require("../../secondaryAdapters/postgres/auth/AuthPostgresModule");
const UserPostgresModule_1 = require("../../secondaryAdapters/postgres/user/UserPostgresModule");
const UserModule_1 = require("../user/UserModule");
const AuthService_1 = require("./application/services/AuthService");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            AuthPostgresModule_1.AuthPostgresModule,
            UserPostgresModule_1.UserPostgresModule,
            UserModule_1.UserModule,
            OAuthModule_1.OAuthModule,
            MailerModule_1.MailerModule,
        ],
        providers: [
            {
                provide: ExpressRequestMapper_1.ExpressRequestMapperType,
                useClass: ExpressRequestMapper_1.ExpressRequestMapper,
            }, {
                provide: ExpressResponseMapper_1.ExpressResponseMapperType,
                useClass: ExpressResponseMapper_1.ExpressResponseMapper,
            },
            AuthService_1.AuthService,
        ],
        exports: [
            AuthService_1.AuthService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=AuthModule.js.map