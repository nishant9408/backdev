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
exports.ChangeHealthTable1594803127192 = void 0;
class ChangeHealthTable1594803127192 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteDataColumn = 'ALTER TABLE health DROP COLUMN data;';
            const addColumns = `
        ALTER TABLE health
            ADD date_of_birth VARCHAR(100) NOT NULL,
            ADD gender gender_type NOT NULL,
            ADD step_count INTEGER NOT NULL,
            ADD workout_count INTEGER NOT NULL
        `;
            yield queryRunner.query(deleteDataColumn);
            yield queryRunner.query(addColumns);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.ChangeHealthTable1594803127192 = ChangeHealthTable1594803127192;
//# sourceMappingURL=1594803127192-ChangeHealthTable.js.map