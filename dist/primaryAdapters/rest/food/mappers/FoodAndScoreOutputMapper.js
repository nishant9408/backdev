"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodAndScoreOutputMapperType = exports.FoodAndScoreOutputMapper = void 0;
const FoodAndScoreOutput_1 = require("../data/FoodAndScoreOutput");
const ImagesOutput_1 = require("../data/ImagesOutput");
const MealOutput_1 = require("../data/MealOutput");
class FoodAndScoreOutputMapper {
    map(from) {
        return FoodAndScoreOutput_1.FoodAndScoreOutput.fromObject({
            fitsTarget: from.fitsTarget,
            fitsDiet: from.fitsDiet,
            personalMatch: from.personalMatch,
            nutritionScore: from.foodInformation.nutritionScore,
            productName: from.foodInformation.productName,
            images: ImagesOutput_1.ImagesOutput.fromObject(from.foodInformation.images),
            recommendation: from.recommendation.map(r => MealOutput_1.MealOutput.fromObject(r)),
        });
    }
}
exports.FoodAndScoreOutputMapper = FoodAndScoreOutputMapper;
const FoodAndScoreOutputMapperType = Symbol.for('FoodAndScoreOutputMapper');
exports.FoodAndScoreOutputMapperType = FoodAndScoreOutputMapperType;
//# sourceMappingURL=FoodAndScoreOutputMapper.js.map