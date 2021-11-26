"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultInterceptor = void 0;
const operators_1 = require("rxjs/operators");
const ApiResponse_1 = require("./ApiResponse");
class ResultInterceptor {
    intercept(context, next) {
        const handler = next.handle();
        return handler.pipe((0, operators_1.map)((data) => ApiResponse_1.ApiResponse.fromObject(data)));
    }
}
exports.ResultInterceptor = ResultInterceptor;
//# sourceMappingURL=ResultInterceptor.js.map