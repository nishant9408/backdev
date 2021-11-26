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
exports.UserAddFields1604652029943 = void 0;
class UserAddFields1604652029943 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const changes = `
            ALTER TABLE users
            ADD COLUMN timezone VARCHAR(50),
            ADD COLUMN notification_token VARCHAR(255);`;
            const deleteFields = `
            ALTER TABLE health_provider
            DROP COLUMN device_id;`;
            const addFields = `
            ALTER TABLE health_provider
            ADD COLUMN u_id bigint;`;
            yield queryRunner.query(addFields);
            yield queryRunner.query(deleteFields);
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
exports.UserAddFields1604652029943 = UserAddFields1604652029943;
//# sourceMappingURL=1604652029943-UserAddFields.js.map