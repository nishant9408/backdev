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
exports.SendDailyDataOutput = void 0;
const swagger_1 = require("@nestjs/swagger");
class SendDailyDataOutput {
    static fromObject(builder) {
        const data = new SendDailyDataOutput();
        data.score = builder.score;
        data.sleep = builder.sleep;
        data.steps = builder.steps;
        data.heartRate = builder.heartRate;
        data.calories = builder.calories;
        return data;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], SendDailyDataOutput.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], SendDailyDataOutput.prototype, "sleep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], SendDailyDataOutput.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], SendDailyDataOutput.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'integer', nullable: true }),
    __metadata("design:type", Object)
], SendDailyDataOutput.prototype, "calories", void 0);
exports.SendDailyDataOutput = SendDailyDataOutput;
//# sourceMappingURL=SendDailyDataOutput.js.map