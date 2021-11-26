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
exports.GetTargetScoreOutput = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetTargetScoreOutput {
    static fromObject(builder) {
        const targetScore = new GetTargetScoreOutput();
        targetScore.id = builder.id || null;
        targetScore.planScore = builder.planScore;
        targetScore.currentScore = builder.currentScore;
        targetScore.monthlyScore = builder.monthlyScore;
        targetScore.recommendations = builder.recommendations;
        targetScore.averageCalories = builder.averageCalories;
        targetScore.planCalories = builder.planCalories;
        targetScore.averageActivity = builder.averageActivity;
        targetScore.planActivity = builder.planActivity;
        return targetScore;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Object)
], GetTargetScoreOutput.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "planScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "currentScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "monthlyScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "averageCalories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "planCalories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer, ms' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "averageActivity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer, ms' }),
    __metadata("design:type", Number)
], GetTargetScoreOutput.prototype, "planActivity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true }),
    __metadata("design:type", Array)
], GetTargetScoreOutput.prototype, "recommendations", void 0);
exports.GetTargetScoreOutput = GetTargetScoreOutput;
//# sourceMappingURL=GetTargetScoreOutput.js.map