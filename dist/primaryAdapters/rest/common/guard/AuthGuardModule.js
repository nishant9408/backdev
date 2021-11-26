"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardModule = void 0;
const common_1 = require("@nestjs/common");
const AuthModule_1 = require("../../../../core/auth/AuthModule");
const AuthPostgresModule_1 = require("../../../../secondaryAdapters/postgres/auth/AuthPostgresModule");
const UserPostgresModule_1 = require("../../../../secondaryAdapters/postgres/user/UserPostgresModule");
const AuthGuard_1 = require("./AuthGuard");
let AuthGuardModule = class AuthGuardModule {
};
AuthGuardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            UserPostgresModule_1.UserPostgresModule,
            AuthPostgresModule_1.AuthPostgresModule,
            AuthModule_1.AuthModule,
        ],
        providers: [
            AuthGuard_1.AuthGuard,
        ],
        exports: [
            AuthGuard_1.AuthGuard,
            UserPostgresModule_1.UserPostgresModule,
            AuthPostgresModule_1.AuthPostgresModule,
        ],
    })
], AuthGuardModule);
exports.AuthGuardModule = AuthGuardModule;
//# sourceMappingURL=AuthGuardModule.js.map