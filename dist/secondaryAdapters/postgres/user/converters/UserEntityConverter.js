"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntityConverterType = exports.UserEntityConverter = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("../../../../core/user/domain/data/User");
const UserEntity_1 = require("../data/UserEntity");
let UserEntityConverter = class UserEntityConverter {
    from(from) {
        return UserEntity_1.UserEntity.fromObject(Object.assign({}, from));
    }
    to(to) {
        return User_1.User.fromObject(Object.assign({}, to));
    }
};
UserEntityConverter = __decorate([
    (0, common_1.Injectable)()
], UserEntityConverter);
exports.UserEntityConverter = UserEntityConverter;
const UserEntityConverterType = Symbol.for('UserEntityConverter');
exports.UserEntityConverterType = UserEntityConverterType;
//# sourceMappingURL=UserEntityConverter.js.map