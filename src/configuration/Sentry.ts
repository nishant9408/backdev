import * as Sentry from '@sentry/node';
import config from './config/Config';

Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.nodeEnv,
});

export function isInitSentry() {
    return [ 'dev'].includes(config.nodeEnv);
}

export default Sentry;
