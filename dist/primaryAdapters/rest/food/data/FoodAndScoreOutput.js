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
exports.FoodAndScoreOutput = void 0;
const swagger_1 = require("@nestjs/swagger");
const FoodScore_1 = require("../../../../core/data/FoodScore");
const ImagesOutput_1 = require("./ImagesOutput");
const MealOutput_1 = require("./MealOutput");
class FoodAndScoreOutput {
    static fromObject(builder) {
        const response = new FoodAndScoreOutput();
        response.nutritionScore = builder.nutritionScore;
        response.productName = builder.productName;
        response.personalMatch = builder.personalMatch;
        response.images = builder.images;
        response.fitsDiet = builder.fitsDiet;
        response.fitsTarget = builder.fitsTarget;
        response.recommendation = builder.recommendation;
        return response;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        minimum: 1,
        maximum: 10,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FoodAndScoreOutput.prototype, "personalMatch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FoodScore_1.FoodScore, nullable: true }),
    __metadata("design:type", Object)
], FoodAndScoreOutput.prototype, "nutritionScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], FoodAndScoreOutput.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    __metadata("design:type", Object)
], FoodAndScoreOutput.prototype, "fitsDiet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    __metadata("design:type", Object)
], FoodAndScoreOutput.prototype, "fitsTarget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ImagesOutput_1.ImagesOutput }),
    __metadata("design:type", ImagesOutput_1.ImagesOutput)
], FoodAndScoreOutput.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => MealOutput_1.MealOutput, nullable: true }),
    __metadata("design:type", Object)
], FoodAndScoreOutput.prototype, "recommendation", void 0);
exports.FoodAndScoreOutput = FoodAndScoreOutput;
//# sourceMappingURL=FoodAndScoreOutput.js.map