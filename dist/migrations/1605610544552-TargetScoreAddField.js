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
exports.TargetScoreAddField1605610544552 = void 0;
class TargetScoreAddField1605610544552 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            ALTER TABLE target_score
            ADD COLUMN recommendations TEXT[] DEFAULT '{}'`;
            yield queryRunner.query(query);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.TargetScoreAddField1605610544552 = TargetScoreAddField1605610544552;
//# sourceMappingURL=1605610544552-TargetScoreAddField.js.map