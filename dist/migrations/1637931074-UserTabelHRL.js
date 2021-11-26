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
exports.UserTabelHRL1637931074 = void 0;
class UserTabelHRL1637931074 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addColumns = `
            ALTER TABLE users
            ADD COLUMN location VARCHAR(100) DEFAULT NULL,
            ADD COLUMN region VARCHAR(100) DEFAULT NULL,
            ADD COLUMN health_condition VARCHAR(100) DEFAULT NULL
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
exports.UserTabelHRL1637931074 = UserTabelHRL1637931074;
//# sourceMappingURL=1637931074-UserTabelHRL.js.map