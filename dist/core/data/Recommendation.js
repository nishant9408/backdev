"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recommendation = void 0;
class Recommendation {
    static fromObject(builder) {
        const data = new Recommendation();
        data.id = builder.id || null;
        data.activityLevel = builder.activityLevel;
        data.categories = builder.categories;
        data.time = builder.time;
        data.age = builder.age;
        data.gender = builder.gender;
        return data;
    }
}
exports.Recommendation = Recommendation;
//# sourceMappingURL=Recommendation.js.map