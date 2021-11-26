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
exports.CreatFoodEnum1605265795596 = void 0;
class CreatFoodEnum1605265795596 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addEnumType = `
            CREATE TYPE food_type AS ENUM ('fish', 'eggs', 'milk');`;
            yield queryRunner.query(addEnumType);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreatFoodEnum1605265795596 = CreatFoodEnum1605265795596;
//# sourceMappingURL=1605265795596-CreatFoodEnum.js.map