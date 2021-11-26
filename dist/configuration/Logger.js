"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const Config_1 = require("./config/Config");
const loggerOptions = { level: Config_1.default.logger.level };
if (Config_1.default.nodeEnv === 'local') {
    loggerOptions.prettyPrint = {
        colorize: true,
    };
}
const logger = pino(loggerOptions);
exports.default = logger;
//# sourceMappingURL=Logger.js.map