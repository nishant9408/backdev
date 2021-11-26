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
exports.DailyScoreParams = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DailyScoreParams {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "sleep", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "steps", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "heartRate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "restingHeartRate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "calories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "lightWorkout", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "moderateWorkout", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "hardWorkout", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreParams.prototype, "totalActivity", void 0);
exports.DailyScoreParams = DailyScoreParams;
//# sourceMappingURL=DailyScoreParams.js.map