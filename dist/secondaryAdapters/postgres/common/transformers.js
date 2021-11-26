"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLBigIntToNumberValueTransformer = void 0;
class SQLBigIntToNumberValueTransformer {
    from(value) {
        return parseInt(value, 10);
    }
    to(value) {
        return value;
    }
}
exports.SQLBigIntToNumberValueTransformer = SQLBigIntToNumberValueTransformer;
//# sourceMappingURL=transformers.js.map