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
var DailyScoreEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyScoreEntity = void 0;
const typeorm_1 = require("typeorm");
const SQLBigIntToNumberValueTransformer_1 = require("../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer");
const wrapNullable_1 = require("../../../../core/sharedKernel/wrapNullable");
let DailyScoreEntity = DailyScoreEntity_1 = class DailyScoreEntity {
    constructor() {
        this.createdAt = new Date();
    }
    static fromObject(builder) {
        const entity = new DailyScoreEntity_1();
        entity.id = (0, wrapNullable_1.wrapNullable)(builder.id);
        entity.userId = builder.userId;
        entity.sleep = (0, wrapNullable_1.wrapNullable)(builder.sleep);
        entity.calories = (0, wrapNullable_1.wrapNullable)(builder.calories);
        entity.steps = (0, wrapNullable_1.wrapNullable)(builder.steps);
        entity.heartRate = (0, wrapNullable_1.wrapNullable)(builder.heartRate);
        entity.restingHeartRate = (0, wrapNullable_1.wrapNullable)(builder.restingHeartRate);
        entity.score = (0, wrapNullable_1.wrapNullable)(builder.score);
        entity.alert = (0, wrapNullable_1.wrapNullable)(builder.alert);
        entity.recommendations = builder.recommendations;
        entity.recommendedCalories = (0, wrapNullable_1.wrapNullable)(builder.recommendedCalories);
        entity.lightWorkout = (0, wrapNullable_1.wrapNullable)(builder.lightWorkout);
        entity.moderateWorkout = (0, wrapNullable_1.wrapNullable)(builder.moderateWorkout);
        entity.hardWorkout = (0, wrapNullable_1.wrapNullable)(builder.hardWorkout);
        entity.totalActivity = (0, wrapNullable_1.wrapNullable)(builder.totalActivity);
        if (builder.createdAt !== null) {
            entity.createdAt = (0, wrapNullable_1.wrapNullable)(builder.createdAt);
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
    __metadata("design:type", String)
], DailyScoreEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alert', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreEntity.prototype, "alert", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sleep',
        nullable: true,
        type: 'bigint',
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "sleep", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'heart_rate',
        nullable: true,
        type: 'bigint',
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "heartRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'resting_heart_rate',
        nullable: true,
        type: 'bigint',
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "restingHeartRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'steps',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'calories',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'score', nullable: true }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'light_workout',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "lightWorkout", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'moderate_workout',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "moderateWorkout", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'hard_workout',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "hardWorkout", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_activity',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "totalActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'recommendations',
        type: 'text',
        array: true,
    }),
    __metadata("design:type", Array)
], DailyScoreEntity.prototype, "recommendations", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'recommended_calories',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    }),
    __metadata("design:type", Number)
], DailyScoreEntity.prototype, "recommendedCalories", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Date)
], DailyScoreEntity.prototype, "createdAt", void 0);
DailyScoreEntity = DailyScoreEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'daily_score' })
], DailyScoreEntity);
exports.DailyScoreEntity = DailyScoreEntity;
//# sourceMappingURL=DailyScoreEntity.js.map