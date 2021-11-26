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
exports.TryExec = void 0;
const common_1 = require("@nestjs/common");
class TryExec {
    constructor(findingFunc) {
        this.func = findingFunc;
    }
    static of(findingFunc) {
        return new TryExec(findingFunc);
    }
    getOrThrow(errorMessage = 'Internal server exception') {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.func();
            if (!res) {
                throw new common_1.InternalServerErrorException(errorMessage);
            }
            return res;
        });
    }
}
exports.TryExec = TryExec;
//# sourceMappingURL=TryExec.js.map