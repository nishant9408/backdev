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
exports.UpdateUserTargetType1605515160115 = void 0;
class UpdateUserTargetType1605515160115 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            ALTER TABLE users
            ALTER COLUMN weight_loss_intensity TYPE DOUBLE PRECISION`;
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
exports.UpdateUserTargetType1605515160115 = UpdateUserTargetType1605515160115;
//# sourceMappingURL=1605515160115-UpdateUserTargetType.js.map