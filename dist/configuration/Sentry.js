"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInitSentry = void 0;
const Sentry = require("@sentry/node");
const Config_1 = require("./config/Config");
Sentry.init({
    dsn: Config_1.default.sentry.dsn,
    environment: Config_1.default.nodeEnv,
});
function isInitSentry() {
    return ['dev'].includes(Config_1.default.nodeEnv);
}
exports.isInitSentry = isInitSentry;
exports.default = Sentry;
//# sourceMappingURL=Sentry.js.map