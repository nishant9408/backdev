"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapNullable = void 0;
function wrapNullable(field) {
    if (field !== undefined) {
        return field;
    }
    else {
        return field || undefined;
    }
}
exports.wrapNullable = wrapNullable;
//# sourceMappingURL=utils.js.map