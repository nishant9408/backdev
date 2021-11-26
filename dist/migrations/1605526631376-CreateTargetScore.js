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
exports.CreateTargetScore1605526631376 = void 0;
class CreateTargetScore1605526631376 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            CREATE TABLE IF NOT EXISTS target_score (
            id BIGSERIAL PRIMARY KEY,
            user_id BIGSERIAL NOT NULL,
            plan_score INTEGER NOT NULL,
            target_score DOUBLE PRECISION NOT NULL,
            monthly_score DOUBLE PRECISION NOT NULL,
            average_calories DOUBLE PRECISION NOT NULL,
            plan_calories DOUBLE PRECISION NOT NULL,
            average_activity BIGSERIAL NOT NULL,
            plan_activity BIGSERIAL NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP DEFAULT NULL
          );`;
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
exports.CreateTargetScore1605526631376 = CreateTargetScore1605526631376;
//# sourceMappingURL=1605526631376-CreateTargetScore.js.map