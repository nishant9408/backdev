"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static fromObject(data, errors = []) {
        const response = new ApiResponse();
        response.errors = errors;
        response.data = data || null;
        return response;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map