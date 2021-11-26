"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPermissions = void 0;
const common_1 = require("@nestjs/common");
class CheckPermissions {
    constructor(checkFunc) {
        this.func = checkFunc;
    }
    static of(checkFunc) {
        return new CheckPermissions(checkFunc);
    }
    throwOnFailure(errorMessage = 'Action is not allowed') {
        if (!this.func()) {
            throw new common_1.ForbiddenException(errorMessage);
        }
    }
}
exports.CheckPermissions = CheckPermissions;
//# sourceMappingURL=CheckPermissions.js.map