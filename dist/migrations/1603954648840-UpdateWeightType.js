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
exports.UpdateWeightType1603954648840 = void 0;
class UpdateWeightType1603954648840 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeType = `
            ALTER TABLE users
            ALTER COLUMN weight TYPE DOUBLE PRECISION,
            ALTER COLUMN height TYPE DOUBLE PRECISION,
            ALTER COLUMN target_weight TYPE DOUBLE PRECISION`;
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
exports.UpdateWeightType1603954648840 = UpdateWeightType1603954648840;
//# sourceMappingURL=1603954648840-UpdateWeightType.js.map