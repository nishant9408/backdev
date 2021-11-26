"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
class Meal {
    static fromObject(builder) {
        const meal = new Meal();
        meal.id = builder.id;
        meal.name = builder.name;
        meal.portion = builder.portion || null;
        meal.calories = builder.calories;
        meal.proteins = builder.proteins;
        meal.fats = builder.fats;
        meal.carbs = builder.carbs;
        meal.ingredients = builder.ingredients;
        return meal;
    }
}
exports.Meal = Meal;
//# sourceMappingURL=Meal.js.map