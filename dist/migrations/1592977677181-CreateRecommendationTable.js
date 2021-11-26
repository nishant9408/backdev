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
exports.CreateRecommendationTable1592977677181 = void 0;
class CreateRecommendationTable1592977677181 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addEnumFoodTime = `
            CREATE TYPE food_time AS ENUM ('breakfast', 'first_snack', 'lunch', 'second_snack', 'dinner');`;
            const addEnumActivityLevel = `
            CREATE TYPE activity_level AS ENUM ('low', 'medium', 'high');`;
            const addEnumGenderTypes = `
            CREATE TYPE gender_type AS ENUM ('male', 'female');`;
            const createRecommendationTableSQL = `
        CREATE TABLE recommendation (
            id BIGSERIAL PRIMARY KEY,
            categories text[] NOT NULL,
            activity_level activity_level NOT NULL,
            time food_time NOT NULL,
            age int[],
            gender gender_type
        );`;
            yield queryRunner.query(addEnumFoodTime);
            yield queryRunner.query(addEnumActivityLevel);
            yield queryRunner.query(addEnumGenderTypes);
            yield queryRunner.query(createRecommendationTableSQL);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateRecommendationTable1592977677181 = CreateRecommendationTable1592977677181;
//# sourceMappingURL=1592977677181-CreateRecommendationTable.js.map