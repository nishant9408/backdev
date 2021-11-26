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
exports.AddColumnsToDailyScore1595520801317 = void 0;
class AddColumnsToDailyScore1595520801317 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addColumns = `
            ALTER TABLE daily_score
            ADD COLUMN light_workout INTEGER DEFAULT NULL,
            ADD COLUMN moderate_workout INTEGER DEFAULT NULL,
            ADD COLUMN hard_workout INTEGER DEFAULT NULL,
            ADD COLUMN total_activity INTEGER DEFAULT NULL
        ;`;
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
exports.AddColumnsToDailyScore1595520801317 = AddColumnsToDailyScore1595520801317;
//# sourceMappingURL=1595520801317-AddColumnsToDailyScore.js.map