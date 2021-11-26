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
exports.RemoveConstraint1604662693547 = void 0;
class RemoveConstraint1604662693547 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const changes = `
            ALTER TABLE daily_score
            DROP CONSTRAINT daily_score_device_id_fkey;`;
            yield queryRunner.query(changes);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RemoveConstraint1604662693547 = RemoveConstraint1604662693547;
//# sourceMappingURL=1604662693547-RemoveConstraint.js.map