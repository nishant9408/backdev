"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseMapperType = exports.UserResponseMapper = void 0;
const common_1 = require("@nestjs/common");
const UserResponse_1 = require("../../../../../primaryAdapters/rest/user/data/response/UserResponse");
let UserResponseMapper = class UserResponseMapper {
    map(from) {
        return UserResponse_1.UserResponse.fromObject(Object.assign({}, from));
    }
};
UserResponseMapper = __decorate([
    (0, common_1.Injectable)()
], UserResponseMapper);
exports.UserResponseMapper = UserResponseMapper;
const UserResponseMapperType = Symbol.for('UserResponseMapper');
exports.UserResponseMapperType = UserResponseMapperType;
//# sourceMappingURL=UserResponseMapper.js.map