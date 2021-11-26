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
exports.GetDailyScoreOutput = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetDailyScoreOutput {
    static fromObject(builder) {
        const data = new GetDailyScoreOutput();
        data.score = builder.score;
        data.steps = builder.steps;
        data.heartRate = builder.heartRate;
        data.calories = builder.calories;
        data.sleep = builder.sleep;
        data.recommendations = builder.recommendations;
        data.recommendedCalories = builder.recommendedCalories;
        data.alert = builder.alert || null;
        return data;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], GetDailyScoreOutput.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], GetDailyScoreOutput.prototype, "sleep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], GetDailyScoreOutput.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], GetDailyScoreOutput.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], GetDailyScoreOutput.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true }),
    __metadata("design:type", Array)
], GetDailyScoreOutput.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], GetDailyScoreOutput.prototype, "recommendedCalories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], GetDailyScoreOutput.prototype, "alert", void 0);
exports.GetDailyScoreOutput = GetDailyScoreOutput;
//# sourceMappingURL=GetDailyScoreOutput.js.map