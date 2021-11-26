"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodAndScore = void 0;
class FoodAndScore {
    static fromObject(builder) {
        const data = new FoodAndScore();
        data.personalMatch = builder.personalMatch || null;
        data.foodInformation = builder.foodInformation;
        data.fitsDiet = builder.fitsDiet || false;
        data.fitsTarget = builder.fitsTarget || false;
        data.recommendation = builder.recommendation || [];
        return data;
    }
}
exports.FoodAndScore = FoodAndScore;
//# sourceMappingURL=FoodAndScore.js.map