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
exports.RecommendationFilling1592979745289 = void 0;
class RecommendationFilling1592979745289 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addRecommendationsMale = `
        INSERT INTO recommendation(categories, activity_level, time, age, gender)
        VALUES
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast', '{18, 30}', 'male'),
            ( '{"3-4 fruits", "vegetable fats"}', 'low', 'first_snack' , '{18, 30}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables"}', 'low', 'lunch', '{18, 30}', 'male'),
            ( '{"dairy fats"}', 'low', 'second_snack', '{18, 30}', 'male'),
            ( '{"animal proteins", "vegetables", "vegetable fats"}', 'low', 'dinner', '{18, 30}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'medium', 'breakfast', '{18, 30}', 'male'),
            ( '{"3-4 fruits", "vegetable fats"}', 'medium', 'first_snack', '{18, 30}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch', '{18, 30}', 'male'),
            ( '{"dairy fats"}', 'medium', 'second_snack', '{18, 30}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner', '{18, 30}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'breakfast', '{18, 30}', 'male'),
            ( '{"4-5 fruits", "vegetable fats", "bodybuilding supplements"}', 'high', 'first_snack', '{18, 30}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'high', 'lunch', '{18, 30}', 'male'),
            ( '{"dairy fats", "protein bars"}', 'high', 'second_snack', '{18, 30}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner', '{18, 30}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast', '{31, 40}', 'male'),
            ( '{"3 fruits"}', 'low', 'first_snack', '{31, 40}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables"}', 'low', 'lunch', '{31, 40}', 'male'),
            ( '{"dairy fats", "plant-based beverages"}', 'low', 'second_snack', '{31, 40}', 'male'),
            ( '{"animal proteins", "vegetables", "vegetable fats"}', 'low', 'dinner', '{31, 40}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'medium', 'breakfast', '{31, 40}', 'male'),
            ( '{"3-4 fruits", "vegetable fats", "protein bar"}', 'medium', 'first_snack', '{31, 40}', 'male'),
            ( '{"whole grains", "plant proteins", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch', '{31, 40}', 'male'),
            ( '{"dairy fats", "plant-based beverages"}', 'medium', 'second_snack', '{31, 40}', 'male'),
            ( '{"whole grains", "plant proteins", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner', '{31, 40}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'breakfast', '{31, 40}', 'male'),
            ( '{"3-4 fruits", "vegetable fats", "bodybuilding supplements"}', 'high', 'first_snack', '{31, 40}', 'male'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'lunch', '{31, 40}', 'male'),
            ( '{"dairy fats", "plant-based beverages", "protein bars"}', 'high', 'second_snack', '{31, 40}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner', '{31, 40}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast', '{41, 50}', 'male'),
            ( '{"3 fruits", "plant-based beverages"}', 'low', 'first_snack', '{41, 50}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables"}', 'low', 'lunch', '{41, 50}', 'male'),
            ( '{"dairy fats", "plant-based beverages"}', 'low', 'second_snack', '{41, 50}', 'male'),
            ( '{"animal proteins", "vegetables", "vegetable fats"}', 'low', 'dinner', '{41, 50}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'medium', 'breakfast', '{41, 50}', 'male'),
            ( '{"3-4 fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'medium', 'first_snack', '{41, 50}', 'male'),
            ( '{"whole grains", "plant proteins", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch', '{41, 50}', 'male'),
            ( '{"dairy fats", "plant-based beverages"}', 'medium', 'second_snack', '{41, 50}', 'male'),
            ( '{"whole grains", "plant proteins", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner', '{41, 50}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'breakfast', '{41, 50}', 'male'),
            ( '{"3-4 fruits", "vegetable fats", "plant-based beverages", "bodybuilding supplements"}', 'high', 'first_snack', '{41, 50}', 'male'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'lunch', '{41, 50}', 'male'),
            ( '{"dairy fats", "plant-based beverages", "protein bars"}', 'high', 'second_snack', '{41, 50}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner', '{41, 50}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast', '{51, 60}', 'male'),
            ( '{"3 fruits", "plant-based beverages"}', 'low', 'first_snack', '{51, 60}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables"}', 'low', 'lunch', '{51, 60}', 'male'),
            ( '{"dairy fats", "plant-based beverages"}', 'low', 'second_snack', '{51, 60}', 'male'),
            ( '{"plant proteins", "vegetables", "vegetable fats"}', 'low', 'dinner', '{51, 60}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'medium', 'breakfast', '{51, 60}', 'male'),
            ( '{"3-4 fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'medium', 'first_snack', '{51, 60}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch', '{51, 60}', 'male'),
            ( '{"dairy fats", "plant-based beverages"}', 'medium', 'second_snack', '{51, 60}', 'male'),
            ( '{"whole grains", "plant proteins", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner', '{51, 60}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'high', 'breakfast', '{51, 60}', 'male'),
            ( '{"3 fruits", "vegetable fats", "plant-based beverages", "bodybuilding supplements"}', 'high', 'first_snack', '{51, 60}', 'male'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats", "1 fruit"}', 'high', 'lunch', '{51, 60}', 'male'),
            ( '{"dairy fats", "plant-based beverages", "protein bars"}', 'high', 'second_snack', '{51, 60}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner', '{51, 60}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast', '{61, 100}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables"}', 'low', 'lunch','{61, 100}', 'male'),
            ( '{"plant-based beverages"}', 'low', 'second_snack','{61, 100}', 'male'),
            ( '{"plant proteins", "vegetables", "vegetable fats"}', 'low', 'dinner','{61, 100}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'medium', 'breakfast','{61, 100}', 'male'),
            ( '{"3 fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'medium', 'first_snack','{61, 100}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch','{61, 100}', 'male'),
            ( '{"plant-based beverages"}', 'medium', 'second_snack','{61, 100}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner','{61, 100}', 'male'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'high', 'breakfast','{61, 100}', 'male'),
            ( '{"3 fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'high', 'first_snack','{61, 100}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats", "1 fruit"}', 'high', 'lunch','{61, 100}', 'male'),
            ( '{"plant-based beverages", "protein bars"}', 'high', 'second_snack','{61, 100}', 'male'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner','{61, 100}', 'male')
           ;`;
            const addRecommendationsFemale = `
        INSERT INTO recommendation(categories, activity_level, time, age, gender)
        VALUES
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast','{18, 30}', 'female'),
            ( '{"1-2 fruits"}', 'low', 'first_snack', '{18, 30}', 'female'),
            ( '{"plant proteins", "vegetables"}', 'low', 'lunch', '{18, 30}', 'female'),
            ( '{"dairy fats"}', 'low', 'second_snack', '{18, 30}', 'female'),
            ( '{"animal proteins", "vegetables", "vegetable fats"}', 'low', 'dinner', '{18, 30}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'medium', 'breakfast', '{18, 30}', 'female'),
            ( '{"3 fruits", "vegetable fats"}', 'medium', 'first_snack','{18, 30}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch', '{18, 30}', 'female'),
            ( '{"dairy fats"}', 'medium', 'second_snack', '{18, 30}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner', '{18, 30}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'breakfast', '{18, 30}', 'female'),
            ( '{"4 fruits", "vegetable fats", "protein bars"}', 'high', 'first_snack', '{18, 30}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'high', 'lunch', '{18, 30}', 'female'),
            ( '{"dairy fats", "protein bars"}', 'high', 'second_snack', '{18, 30}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner', '{18, 30}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast','{31, 40}', 'female'),
            ( '{"1 fruit"}', 'low', 'first_snack','{31, 40}', 'female'),
            ( '{"plant proteins", "vegetables"}', 'low', 'lunch','{31, 40}', 'female'),
            ( '{"dairy fats", "plant-based beverages"}', 'low', 'second_snack','{31, 40}', 'female'),
            ( '{"animal proteins", "vegetables", "vegetable fats"}', 'low', 'dinner','{31, 40}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'medium', 'breakfast','{31, 40}', 'female'),
            ( '{"2 fruits", "vegetable fats", "protein bar"}', 'medium', 'first_snack','{31, 40}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch','{31, 40}', 'female'),
            ( '{"dairy fats", "plant-based beverages"}', 'medium', 'second_snack','{31, 40}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner','{31, 40}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'breakfast','{31, 40}', 'female'),
            ( '{"4 fruits", "vegetable fats", "protein bars"}', 'high', 'first_snack','{31, 40}', 'female'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'lunch','{31, 40}', 'female'),
            ( '{"dairy fats", "plant-based beverages", "protein bars"}', 'high', 'second_snack','{31, 40}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner','{31, 40}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast','{41, 50}', 'female'),
            ( '{"1 fruit", "plant-based beverages"}', 'low', 'first_snack','{41, 50}', 'female'),
            ( '{"plant proteins", "vegetables"}', 'low', 'lunch','{41, 50}', 'female'),
            ( '{"dairy fats", "plant-based beverages"}', 'low', 'second_snack','{41, 50}', 'female'),
            ( '{"animal proteins", "vegetables", "vegetable fats"}', 'low', 'dinner','{41, 50}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'medium', 'breakfast','{41, 50}', 'female'),
            ( '{"2 fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'medium', 'first_snack','{41, 50}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch','{41, 50}', 'female'),
            ( '{"dairy fats", "plant-based beverages"}', 'medium', 'second_snack','{41, 50}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner','{41, 50}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "simple sugars"}', 'high', 'breakfast','{41, 50}', 'female'),
            ( '{"4 fruits", "vegetable fats", "plant-based beverages", "protein bars"}', 'high', 'first_snack','{41, 50}', 'female'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'lunch','{41, 50}', 'female'),
            ( '{"dairy fats", "plant-based beverages", "protein bars"}', 'high', 'second_snack','{41, 50}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner','{41, 50}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast','{51, 60}', 'female'),
            ( '{"1 fruit", "plant-based beverages"}', 'low', 'first_snack','{51, 60}', 'female'),
            ( '{"plant proteins", "vegetables"}', 'low', 'lunch','{51, 60}', 'female'),
            ( '{"dairy fats", "plant-based beverages"}', 'low', 'second_snack','{51, 60}', 'female'),
            ( '{"plant proteins", "vegetables", "vegetable fats"}', 'low', 'dinner','{51, 60}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'medium', 'breakfast','{51, 60}', 'female'),
            ( '{"2 fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'medium', 'first_snack','{51, 60}', 'female'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch','{51, 60}', 'female'),
            ( '{"dairy fats", "plant-based beverages"}', 'medium', 'second_snack','{51, 60}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner','{51, 60}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'high', 'breakfast','{51, 60}', 'female'),
            ( '{"3 fruits", "vegetable fats", "plant-based beverages", "protein bars"}', 'high', 'first_snack','{51, 60}', 'female'),
            ( '{"whole grains", "animal proteins", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'lunch','{51, 60}', 'female'),
            ( '{"dairy fats", "plant-based beverages", "protein bars"}', 'high', 'second_snack','{51, 60}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner','{51, 60}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats"}', 'low', 'breakfast', '{61,100}', 'female'),
            ( '{"1 fruit", "plant-based beverages"}', 'low', 'first_snack', '{61,100}', 'female'),
            ( '{"plant proteins", "vegetables"}', 'low', 'lunch', '{61,100}', 'female'),
            ( '{"plant-based beverages"}', 'low', 'second_snack', '{61,100}', 'female'),
            ( '{"plant proteins", "vegetables", "vegetable fats"}', 'low', 'dinner', '{61,100}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'medium', 'breakfast', '{61,100}', 'female'),
            ( '{"2 unsweetened fruits", "vegetable fats", "plant-based beverages", "protein bar"}', 'medium', 'first_snack', '{61,100}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'lunch', '{61,100}', 'female'),
            ( '{"plant-based beverages"}', 'medium', 'second_snack', '{61,100}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'medium', 'dinner', '{61,100}', 'female'),
            ( '{"whole grains", "animal proteins", "vegetables", "vegetable fats", "1 fruit"}', 'high', 'breakfast', '{61,100}', 'female'),
            ( '{"3 unsweetened fruits", "vegetable fats", "plant-based beverages", "protein bars"}', 'high', 'first_snack', '{61,100}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'lunch', '{61,100}', 'female'),
            ( '{"plant-based beverages", "protein bars"}', 'high', 'second_snack', '{61,100}', 'female'),
            ( '{"whole grains", "plant proteins", "vegetables", "vegetable fats"}', 'high', 'dinner', '{61,100}', 'female')
        ;`;
            yield queryRunner.query(addRecommendationsMale);
            yield queryRunner.query(addRecommendationsFemale);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RecommendationFilling1592979745289 = RecommendationFilling1592979745289;
//# sourceMappingURL=1592979745289-RecommendationFilling.js.map