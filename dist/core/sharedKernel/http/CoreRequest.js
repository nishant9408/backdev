"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreRequest = void 0;
class CoreRequest {
    static fromObject(constrObject) {
        const newReq = new CoreRequest();
        newReq.body = constrObject.body || {};
        newReq.headers = constrObject.headers || {};
        newReq.query = constrObject.query || {};
        newReq.method = constrObject.method;
        return newReq;
    }
}
exports.CoreRequest = CoreRequest;
//# sourceMappingURL=CoreRequest.js.map