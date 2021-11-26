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
exports.RegistrationInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const Diet_1 = require("../../../../../core/data/Diet");
const Food_1 = require("../../../../../core/data/Food");
const GenderType_1 = require("../../../../../core/data/GenderType");
const HealthProviderData_1 = require("../../../healthData/input/HealthProviderData");
const BaseAuthInput_1 = require("./BaseAuthInput");
class RegistrationInput extends BaseAuthInput_1.BaseAuthInput {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(7, { message: 'Password is too short. Min length is 7 symbols.' }),
    (0, swagger_1.ApiProperty)({ minLength: 7, example: '12312ads12da' }),
    __metadata("design:type", String)
], RegistrationInput.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RegistrationInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RegistrationInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(6),
    (0, class_validator_1.Max)(100),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RegistrationInput.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(GenderType_1.GenderType),
    (0, swagger_1.ApiProperty)({ enum: GenderType_1.GenderType }),
    __metadata("design:type", String)
], RegistrationInput.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RegistrationInput.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RegistrationInput.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RegistrationInput.prototype, "targetWeight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RegistrationInput.prototype, "weightLossIntensity", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], RegistrationInput.prototype, "foodIntolerance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RegistrationInput.prototype, "averageSleepingTime", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Diet_1.Diet),
    (0, swagger_1.ApiProperty)({
        enum: Diet_1.Diet,
    }),
    __metadata("design:type", String)
], RegistrationInput.prototype, "diet", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ required: true, enum: Food_1.Food, isArray: true }),
    __metadata("design:type", Array)
], RegistrationInput.prototype, "foods", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", HealthProviderData_1.HealthProviderData)
], RegistrationInput.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Europe/Kiev' }),
    __metadata("design:type", String)
], RegistrationInput.prototype, "timezone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '1qww2-swsw-dsa1' }),
    __metadata("design:type", String)
], RegistrationInput.prototype, "notificationToken", void 0);
exports.RegistrationInput = RegistrationInput;
//# sourceMappingURL=RegistrationInput.js.map