"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMapperType = exports.TokenMapper = void 0;
const common_1 = require("@nestjs/common");
const OAuth2Token_1 = require("../../../core/auth/application/data/internal/OAuth2Token");
let TokenMapper = class TokenMapper {
    map(from) {
        return OAuth2Token_1.OAuth2Token.fromObject(Object.assign(Object.assign({}, from), { userId: Number(from.user.id) }));
    }
};
TokenMapper = __decorate([
    (0, common_1.Injectable)()
], TokenMapper);
exports.TokenMapper = TokenMapper;
const TokenMapperType = Symbol.for('TokenMapper');
exports.TokenMapperType = TokenMapperType;
//# sourceMappingURL=TokenMapper.js.map