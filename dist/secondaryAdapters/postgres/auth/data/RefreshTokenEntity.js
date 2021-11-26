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
var RefreshTokenEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenEntity = void 0;
const typeorm_1 = require("typeorm");
const transformers_1 = require("../../common/transformers");
let RefreshTokenEntity = RefreshTokenEntity_1 = class RefreshTokenEntity {
    static fromObject(builder) {
        const newToken = new RefreshTokenEntity_1();
        newToken.refreshToken = builder.refreshToken;
        newToken.clientId = builder.clientId;
        newToken.scope = builder.scope;
        newToken.userId = builder.userId;
        newToken.expires = builder.expires;
        newToken.isActive = builder.isActive;
        return newToken;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'refresh_token' }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'scope' }),
    __metadata("design:type", Array)
], RefreshTokenEntity.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', transformer: new transformers_1.SQLBigIntToNumberValueTransformer() }),
    __metadata("design:type", Number)
], RefreshTokenEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires' }),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "expires", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Boolean)
], RefreshTokenEntity.prototype, "isActive", void 0);
RefreshTokenEntity = RefreshTokenEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'oauth_refresh_token' })
], RefreshTokenEntity);
exports.RefreshTokenEntity = RefreshTokenEntity;
//# sourceMappingURL=RefreshTokenEntity.js.map