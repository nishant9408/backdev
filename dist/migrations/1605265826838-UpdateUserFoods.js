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
exports.UpdateUserFoods1605265826838 = void 0;
class UpdateUserFoods1605265826838 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteFields = `
            ALTER TABLE users
            DROP COLUMN IF EXISTS foods;`;
            const addFields = `
            ALTER TABLE users
            ADD COLUMN foods food_type[];`;
            yield queryRunner.query(deleteFields);
            yield queryRunner.query(addFields);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UpdateUserFoods1605265826838 = UpdateUserFoods1605265826838;
//# sourceMappingURL=1605265826838-UpdateUserFoods.js.map