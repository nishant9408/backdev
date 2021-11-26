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
var TargetScoreEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetScoreEntity = void 0;
const typeorm_1 = require("typeorm");
const SQLBigIntToNumberValueTransformer_1 = require("../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer");
const wrapNullable_1 = require("../../../../core/sharedKernel/wrapNullable");
let TargetScoreEntity = TargetScoreEntity_1 = class TargetScoreEntity {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    static fromObject(builder) {
        const entity = new TargetScoreEntity_1();
        entity.id = (0, wrapNullable_1.wrapNullable)(builder.id);
        entity.userId = builder.userId;
        entity.planScore = builder.planScore;
        entity.currentScore = builder.currentScore;
        entity.recommendations = builder.recommendations;
        entity.monthlyScore = builder.monthlyScore;
        entity.period = builder.period;
        entity.averageCalories = builder.averageCalories;
        entity.planCalories = builder.planCalories;
        entity.averageActivity = builder.averageActivity;
        entity.planActivity = builder.planActivity;
        if (builder.createdAt !== null) {
            entity.createdAt = (0, wrapNullable_1.wrapNullable)(builder.createdAt);
        }
        if (builder.updatedAt !== null) {
            entity.updatedAt = (0, wrapNullable_1.wrapNullable)(builder.updatedAt);
        }
        if (builder.deletedAt !== null) {
            entity.deletedAt = (0, wrapNullable_1.wrapNullable)(builder.deletedAt);
        }
        return entity;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer_1.SQLBigIntToNumberValueTransformer(),
    }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', transformer: new SQLBigIntToNumberValueTransformer_1.SQLBigIntToNumberValueTransformer() }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_score', type: 'double precision' }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "planScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_score', type: 'double precision' }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "currentScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_score', type: 'double precision' }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "monthlyScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'period', type: 'integer' }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "period", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'average_calories', type: 'double precision' }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "averageCalories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_calories', type: 'double precision' }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "planCalories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'average_activity', type: 'bigint', transformer: new SQLBigIntToNumberValueTransformer_1.SQLBigIntToNumberValueTransformer() }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "averageActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_activity', type: 'bigint', transformer: new SQLBigIntToNumberValueTransformer_1.SQLBigIntToNumberValueTransformer() }),
    __metadata("design:type", Number)
], TargetScoreEntity.prototype, "planActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recommendations', type: 'text', array: true }),
    __metadata("design:type", Array)
], TargetScoreEntity.prototype, "recommendations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Date)
], TargetScoreEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], TargetScoreEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], TargetScoreEntity.prototype, "deletedAt", void 0);
TargetScoreEntity = TargetScoreEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'target_score' })
], TargetScoreEntity);
exports.TargetScoreEntity = TargetScoreEntity;
//# sourceMappingURL=TargetScoreEntity.js.map