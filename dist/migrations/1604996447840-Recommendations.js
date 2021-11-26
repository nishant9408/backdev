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
exports.Recommendations1604996447840 = void 0;
class Recommendations1604996447840 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addEnumType = `
            CREATE TYPE diet_type AS ENUM ('ketodiet', 'gluten free', 'balanced', 'vegan', 'vegetarian', 'vegetarian with fish', 'vegetarian with eggs', 'vegetarian with milk');`;
            const deleteFields = `
            ALTER TABLE users
            DROP COLUMN diet;`;
            const addFields = `
            ALTER TABLE users
            ADD COLUMN diet diet_type;`;
            const newTable = `
        CREATE TABLE meals (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(255),
            calories DOUBLE PRECISION,
            proteins DOUBLE PRECISION,
            fats DOUBLE PRECISION,
            carbs DOUBLE PRECISION,
            ingredients TEXT[],
            diet diet_type
        );`;
            yield queryRunner.query(addEnumType);
            yield queryRunner.query(deleteFields);
            yield queryRunner.query(addFields);
            yield queryRunner.query(newTable);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Recommendations1604996447840 = Recommendations1604996447840;
//# sourceMappingURL=1604996447840-Recommendations.js.map