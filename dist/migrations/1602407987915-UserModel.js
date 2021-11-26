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
exports.UserModel1602407987915 = void 0;
class UserModel1602407987915 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const genderEnum = `
        CREATE TYPE gender_enum AS ENUM ('male', 'female');`;
            const createUserTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            gender gender_enum DEFAULT NULL,
            age INTEGER NOT NULL,
            height INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            target_weight INTEGER NOT NULL,
            weight_loss_intensity INTEGER NOT NULL,
            health_condition VARCHAR(255) NOT NULL,
            region VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            food_intolerance text[] NOT NULL,
            diet VARCHAR(255) NOT NULL,
            foods text[] NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP DEFAULT NULL
          );`;
            yield queryRunner.query(genderEnum);
            yield queryRunner.query(createUserTableSQL);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UserModel1602407987915 = UserModel1602407987915;
//# sourceMappingURL=1602407987915-UserModel.js.map