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
exports.AddRestingHeartRate1595931749844 = void 0;
class AddRestingHeartRate1595931749844 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addColumns = `
            ALTER TABLE daily_score
            ADD COLUMN resting_heart_rate INTEGER DEFAULT NULL
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
exports.AddRestingHeartRate1595931749844 = AddRestingHeartRate1595931749844;
//# sourceMappingURL=1595931749844-AddRestingHeartRate.js.map