"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreResponse = void 0;
class CoreResponse {
    static fromObject(constrObject) {
        const newRes = new CoreResponse();
        newRes.headers = constrObject.headers;
        return newRes;
    }
}
exports.CoreResponse = CoreResponse;
//# sourceMappingURL=CoreResponse.js.map