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
exports.SleepingHourToUser1604391946242 = void 0;
class SleepingHourToUser1604391946242 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeType = `
            ALTER TABLE users
            ADD COLUMN average_sleeping_time DOUBLE PRECISION NOT NULL DEFAULT 7;`;
            yield queryRunner.query(changeType);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.SleepingHourToUser1604391946242 = SleepingHourToUser1604391946242;
//# sourceMappingURL=1604391946242-SleepingHourToUser.js.map