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
exports.DailyScoreOutput = void 0;
const swagger_1 = require("@nestjs/swagger");
class DailyScoreOutput {
    static fromObject(builder) {
        const data = new DailyScoreOutput();
        data.score = builder.score;
        data.steps = builder.steps;
        data.heartRate = builder.heartRate;
        data.calories = builder.calories;
        data.sleep = builder.sleep;
        return data;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreOutput.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreOutput.prototype, "sleep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreOutput.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreOutput.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], DailyScoreOutput.prototype, "calories", void 0);
exports.DailyScoreOutput = DailyScoreOutput;
//# sourceMappingURL=DailyScoreOutput.js.map