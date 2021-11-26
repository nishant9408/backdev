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
var UserEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const Diet_1 = require("../../../../core/data/Diet");
const Food_1 = require("../../../../core/data/Food");
const GenderType_1 = require("../../../../core/data/GenderType");
const transformers_1 = require("../../common/transformers");
const utils_1 = require("../../common/utils");
let UserEntity = UserEntity_1 = class UserEntity {
    constructor() {
        this.createdAt = new Date();
        this.deletedAt = null;
    }
    static fromObject(builder) {
        const newUser = new UserEntity_1();
        newUser.id = (0, utils_1.wrapNullable)(builder.id);
        newUser.notificationToken = builder.notificationToken;
        newUser.timezone = builder.timezone;
        newUser.name = builder.name;
        newUser.email = builder.email;
        newUser.password = (0, utils_1.wrapNullable)(builder.password);
        newUser.age = (0, utils_1.wrapNullable)(builder.age);
        newUser.gender = builder.gender;
        newUser.foodIntolerance = builder.foodIntolerance;
        newUser.foods = builder.foods;
        newUser.averageSleepingTime = builder.averageSleepingTime;
        newUser.diet = builder.diet;
        newUser.height = builder.height;
        newUser.weightLossIntensity = builder.weightLossIntensity;
        newUser.weight = builder.weight;
        newUser.targetWeight = builder.targetWeight;
        if (builder.deletedAt != null) {
            newUser.deletedAt = builder.deletedAt;
        }
        if (builder.createdAt != null) {
            newUser.createdAt = builder.createdAt;
        }
        return newUser;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'id',
        generated: true,
        transformer: new transformers_1.SQLBigIntToNumberValueTransformer(),
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'age' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender' }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'height' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_weight' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "targetWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight_loss_intensity' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "weightLossIntensity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'average_sleeping_time' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "averageSleepingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'food_intolerance', array: true, type: 'text' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "foodIntolerance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timezone' }),
    __metadata("design:type", String)
], UserEntity.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notification_token' }),
    __metadata("design:type", String)
], UserEntity.prototype, "notificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'diet', type: 'enum', enum: Diet_1.Diet }),
    __metadata("design:type", String)
], UserEntity.prototype, "diet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'foods', array: true, type: 'enum', enum: Food_1.Food }),
    __metadata("design:type", Array)
], UserEntity.prototype, "foods", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "deletedAt", void 0);
UserEntity = UserEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map