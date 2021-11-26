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
var HealthProviderEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthProviderEntity = void 0;
const typeorm_1 = require("typeorm");
const HealthProviderName_1 = require("../../../../core/data/HealthProviderName");
const SQLBigIntToNumberValueTransformer_1 = require("../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer");
const wrapNullable_1 = require("../../../../core/sharedKernel/wrapNullable");
let HealthProviderEntity = HealthProviderEntity_1 = class HealthProviderEntity {
    constructor() {
        this.createdAt = new Date();
    }
    static fromObject(builder) {
        const data = new HealthProviderEntity_1();
        data.id = (0, wrapNullable_1.wrapNullable)(builder.id);
        data.uId = (0, wrapNullable_1.wrapNullable)(builder.uId);
        data.name = builder.name;
        data.timezone = (0, wrapNullable_1.wrapNullable)(builder.timezone);
        data.accessToken = (0, wrapNullable_1.wrapNullable)(builder.accessToken);
        data.refreshToken = (0, wrapNullable_1.wrapNullable)(builder.refreshToken);
        data.userId = (0, wrapNullable_1.wrapNullable)(builder.userId);
        data.scope = (0, wrapNullable_1.wrapNullable)(builder.scope);
        data.tokenType = (0, wrapNullable_1.wrapNullable)(builder.tokenType);
        data.expiresIn = (0, wrapNullable_1.wrapNullable)(builder.expiresIn);
        data.updatedAt = new Date();
        if (builder.createdAt != null) {
            data.createdAt = builder.createdAt;
        }
        return data;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer_1.SQLBigIntToNumberValueTransformer(),
    }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'enum', enum: HealthProviderName_1.HealthProviderName }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_token', nullable: true }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token', nullable: true }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timezone', nullable: true }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'u_id' }),
    __metadata("design:type", Number)
], HealthProviderEntity.prototype, "uId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scope', nullable: true }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_type', nullable: true }),
    __metadata("design:type", String)
], HealthProviderEntity.prototype, "tokenType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_in', nullable: true }),
    __metadata("design:type", Number)
], HealthProviderEntity.prototype, "expiresIn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Date)
], HealthProviderEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], HealthProviderEntity.prototype, "updatedAt", void 0);
HealthProviderEntity = HealthProviderEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'health_provider' })
], HealthProviderEntity);
exports.HealthProviderEntity = HealthProviderEntity;
//# sourceMappingURL=HealthProviderEntity.js.map