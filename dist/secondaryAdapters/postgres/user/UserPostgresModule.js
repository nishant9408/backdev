"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostgresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserRepository_1 = require("../../../core/user/port/UserRepository");
const UserEntityConverter_1 = require("./converters/UserEntityConverter");
const UserEntity_1 = require("./data/UserEntity");
const UserRepositoryAdapter_1 = require("./repository/UserRepositoryAdapter");
let UserPostgresModule = class UserPostgresModule {
};
UserPostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                UserEntity_1.UserEntity,
            ])],
        providers: [
            {
                provide: UserEntityConverter_1.UserEntityConverterType,
                useClass: UserEntityConverter_1.UserEntityConverter,
            }, {
                provide: UserRepository_1.UserRepositoryType,
                useClass: UserRepositoryAdapter_1.UserRepositoryAdapter,
            },
        ],
        exports: [
            UserRepository_1.UserRepositoryType,
            UserEntityConverter_1.UserEntityConverterType,
        ],
    })
], UserPostgresModule);
exports.UserPostgresModule = UserPostgresModule;
//# sourceMappingURL=UserPostgresModule.js.map