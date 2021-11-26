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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const Diet_1 = require("../../../../../core/data/Diet");
const GenderType_1 = require("../../../../../core/data/GenderType");
class UserResponse {
    static fromObject(builder) {
        const user = new UserResponse();
        user.id = builder.id;
        user.timezone = builder.timezone;
        user.notificationToken = builder.notificationToken;
        user.name = builder.name;
        user.email = builder.email;
        user.age = builder.age;
        user.password = builder.password;
        user.foodIntolerance = builder.foodIntolerance;
        user.foods = builder.foods;
        user.averageSleepingTime = builder.averageSleepingTime;
        user.gender = builder.gender;
        user.diet = builder.diet;
        user.height = builder.height;
        user.weightLossIntensity = builder.weightLossIntensity;
        user.weight = builder.weight;
        user.targetWeight = builder.targetWeight;
        return user;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    __metadata("design:type", Object)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(7, { message: 'Password is too short. Min length is 7 symbols.' }),
    (0, swagger_1.ApiProperty)({ minLength: 7 }),
    __metadata("design:type", String)
], UserResponse.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(6),
    (0, class_validator_1.Max)(100),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(GenderType_1.GenderType),
    (0, swagger_1.ApiProperty)({ enum: GenderType_1.GenderType }),
    __metadata("design:type", String)
], UserResponse.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "averageSleepingTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "targetWeight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "weightLossIntensity", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UserResponse.prototype, "foodIntolerance", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Diet_1.Diet),
    (0, swagger_1.ApiProperty)({ enum: Diet_1.Diet }),
    __metadata("design:type", String)
], UserResponse.prototype, "diet", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UserResponse.prototype, "foods", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "timezone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "notificationToken", void 0);
exports.UserResponse = UserResponse;
//# sourceMappingURL=UserResponse.js.map