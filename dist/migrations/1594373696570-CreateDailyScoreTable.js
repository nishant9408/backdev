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
exports.CreateDailyScoreTable1594373696570 = void 0;
class CreateDailyScoreTable1594373696570 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const createDailyScoreSQL = `
        CREATE TABLE daily_score (
            id BIGSERIAL PRIMARY KEY,
            device_id VARCHAR(255),
            sleep INTEGER DEFAULT NULL,
            heart_rate INTEGER DEFAULT NULL,
            steps INTEGER DEFAULT NULL,
            calories INTEGER DEFAULT NULL,
            score INTEGER DEFAULT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (device_id) REFERENCES device(device_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
        );`;
            yield queryRunner.query(createDailyScoreSQL);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateDailyScoreTable1594373696570 = CreateDailyScoreTable1594373696570;
//# sourceMappingURL=1594373696570-CreateDailyScoreTable.js.map