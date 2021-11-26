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
const path_1 = require("path");
const typeorm_1 = require("typeorm");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield (0, typeorm_1.getConnectionOptions)();
    return Object.assign(Object.assign({}, options), { synchronize: false, logging: true, entities: [(0, path_1.join)(__dirname, '../**/*Entity{.ts,.js}')], migrations: [(0, path_1.join)(__dirname, '../../../migrations/*{.ts,.js}')], migrationsRun: true });
});
//# sourceMappingURL=postgresConfiguration.js.map