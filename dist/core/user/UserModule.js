"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const UserPostgresModule_1 = require("../../secondaryAdapters/postgres/user/UserPostgresModule");
const CoreModule_1 = require("../CoreModule");
const UserResponseMapper_1 = require("./application/services/converters/UserResponseMapper");
const UserManagementService_1 = require("./application/services/UserManagementService");
const UserQueryService_1 = require("./application/services/UserQueryService");
const UserRegistrationService_1 = require("./application/services/UserRegistrationService");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [UserPostgresModule_1.UserPostgresModule, CoreModule_1.CoreModule],
        providers: [
            {
                provide: UserResponseMapper_1.UserResponseMapperType,
                useClass: UserResponseMapper_1.UserResponseMapper,
            },
            UserQueryService_1.UserQueryService,
            UserRegistrationService_1.UserRegistrationService,
            UserManagementService_1.UserManagementService,
        ],
        exports: [
            UserResponseMapper_1.UserResponseMapperType,
            UserQueryService_1.UserQueryService,
            UserRegistrationService_1.UserRegistrationService,
            UserManagementService_1.UserManagementService,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=UserModule.js.map