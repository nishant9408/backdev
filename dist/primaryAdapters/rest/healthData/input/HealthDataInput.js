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
exports.HealthDataInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const GenderType_1 = require("../../../../core/data/GenderType");
class HealthDataInput {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        nullable: true,
        example: '1996-11-26',
        description: 'any date type',
    }),
    __metadata("design:type", Object)
], HealthDataInput.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(GenderType_1.GenderType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ enum: GenderType_1.GenderType, nullable: true }),
    __metadata("design:type", Object)
], HealthDataInput.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ type: Number, minimum: 1 }),
    __metadata("design:type", Number)
], HealthDataInput.prototype, "stepCount", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Number)
], HealthDataInput.prototype, "workoutCount", void 0);
exports.HealthDataInput = HealthDataInput;
//# sourceMappingURL=HealthDataInput.js.map