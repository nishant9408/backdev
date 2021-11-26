"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodInformation = void 0;
class FoodInformation {
    static fromObject(builder) {
        const data = new FoodInformation();
        data.nutritionScore = builder.nutritionScore;
        data.productName = builder.productName;
        data.images = builder.images;
        data.basicCategory = builder.basicCategory;
        return data;
    }
}
exports.FoodInformation = FoodInformation;
//# sourceMappingURL=FoodInformation.js.map