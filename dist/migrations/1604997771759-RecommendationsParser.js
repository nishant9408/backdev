"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationsParser1604997771759 = void 0;
const dietParser_1 = require("../diets/dietParser");
class RecommendationsParser1604997771759 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, dietParser_1.dietParser)([
                'ketodiet.csv',
                'gluten_free.csv',
                'balanced.csv',
                'vegan.csv',
                'vegetarian_with_eggs.csv',
                'vegetarian_with_fish.csv',
                'vegetarian_with_milk.csv',
            ]);
            const add = `
            INSERT INTO meals (name, calories, proteins, fats, carbs, diet, ingredients)
            VALUES ${rows};`;
            yield queryRunner.query(add);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RecommendationsParser1604997771759 = RecommendationsParser1604997771759;
//# sourceMappingURL=1604997771759-RecommendationsParser.js.map