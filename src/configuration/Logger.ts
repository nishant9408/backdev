import * as pino from 'pino';
import config from './config/Config';

const loggerOptions: pino.LoggerOptions = { level: config.logger.level };

if (config.nodeEnv === 'local') {
    loggerOptions.prettyPrint = {
        colorize: true,
    };
}

const logger = pino(loggerOptions);

export default logger;
