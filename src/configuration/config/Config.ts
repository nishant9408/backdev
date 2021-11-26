import * as assert from 'assert';
import * as DotEnv from 'dotenv';
import { Level } from 'pino';
import { capitalize } from '../../core/sharedKernel/capitalize';

export const ALLOWED_NODE_ENV = [
    'local',
    'dev',
];

export interface EnvConfigInterface {
    markets: {
        radius: number;
        list: Array<{
            name: string;
            link: string;
        }>;
    };
    jobs: {
        dailyScoreNotifications: {
            time: string;
            silentTime: string;
        };
        targetScoreNotifications: {
            time: string;
        };
    };
    auth: {
        accessTokenLifetime: number;
        refreshTokenLifetime: number;
    };
}

export interface ConfigInterface extends EnvConfigInterface {
    apiPrefix: string;
    nodeEnv: string;
    host: string;
    port: string;
    logger: {
        level: Level;
    };
    docs: {
        auth: {
            user: string;
            password: string;
        };
    };
    cls: {
        contextName: string;
        transactionManagerKey: string;
    };
    sentry: {
        dsn: string;
    };
    fitbit: {
        clientId: string;
        clientSecret: string;
        verificationCode: string;
        subscriberId: string;
    };
    mapBox: {
      accessToken: string;
    };
    firebase: {
        serviceAccount: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
        };
        databaseURL: string;
    };
    mailer: {
        user: string;
        pass: string;
    };
}

let config: ConfigInterface;

function configure(): ConfigInterface {
    const nodeEnv = process.env.NODE_ENV || 'local';
    assert(ALLOWED_NODE_ENV.indexOf(nodeEnv) > -1);
    const path = `env/.env.${nodeEnv}`;
    DotEnv.config({ path });
    const envConfig = require(`./${capitalize(nodeEnv)}Config`);

    return {
        apiPrefix: '/api',
        nodeEnv: process.env.NODE_ENV || 'local',
        port: process.env.PORT || '80',
        host: process.env.HOST || '0.0.0.0',
        cls: {
            contextName: '__cls__context',
        },
        logger: {
            level: 'info',
        },
        sentry: {
            dsn: process.env.SENTRY_DSN || 'https://fee7653434234eb79423ab9b1d59e43f@o1042492.ingest.sentry.io/6011536',
        },
        docs: {
            auth: {
                user: process.env.DOCS_USER || 'test',
                password: process.env.DOCS_PASSWORD || 'test',
            },
        },
        fitbit: {
            clientId: process.env.FITBIT_CLIENT_ID || '22BLWS',
            clientSecret: process.env.FITBIT_CLIENT_SECRET || 'f9a29963b28633a500048fb6fc665eb5',
            verificationCode: process.env.FITBIT_VERIFICATION_CODE || 'a928f644c98e9b63cd165f98a7152651258126b187a044b0cc304dcc1220fe10',
            subscriberId: process.env.FITBIT_SUBSCRIBER_ID || 'qeqt-dev',
        },
        mapBox: {
            accessToken: process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZGV2ZWxvcGVyNDk4MTAiLCJhIjoiY2t1aTl2NHQwMDFjODJ1cXplZWN4d240biJ9.hl81uthErEf0F0Cdy9x78A',
        },
        firebase: {
            serviceAccount: {
                type: process.env.FIREBASE_TYPE || 'service_account',
                project_id: process.env.FIREBASE_PROJECT_ID || 'healthy-picks-b95b5',
                private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '21de18cb89c093b982831cb64ff54264e5db80cb',
                private_key: process.env.FIREBASE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDcL8VVSGXo4Hxq\nZqTtR+8t9eT9FGpU2usX949uORxMuYDutuJ7mgzhQuTi6nI8r81FFB4ikbfQLLYd\naWFMcwoQubH3UYO+kvFozOI082xmdmBQ+BMnEt2nmskSNR/+9mQ/Rtc/PJyaplEU\nlDFczhlk20P+amjTMQga/XbHq03F6PETvwQya+f1MKJPYlPKhwJ23x8LdpyM5QHL\nPv5GB0Vo0M9TjLF+kMORwyuNdIW6YBsgLyvE4602abv2MB4oKOoch3od8lV+1Tjx\nQayxX7S5hbsUe716BTIwCUJN3gOBRuKxB51n9MRhJjOmBcv7g8PeJ34lod+QsWNA\nsXX+bSuHAgMBAAECggEAHoV+sKIvAjdv953P2dZhWLkfq1czoBySfwmBd9Fx007Z\niP2P6ntBss3/hVbjS/dAmIU/4iHZ3YD9I5mSc7L0n7nl6fcCMJ4U2aag6p8dlRxu\noHqqyP1L/Wou2hfEHicQYVcUCj+AI83PKm+aYhdtnLXqOG+OpUvEKF2fI/Fif/7W\nwUEnNSbSlKrXUAioOKQy4mS9Izg8Jx9b7lWk4ZAeCLvOlfxIJALulGn0Fx5+13+t\niLQ1BAzf/RR3IBO4hyM4GQUeLEXLppfdqqpsycEVao5cBgpoHAVmdtBd/lKf8S2V\nODvqIcTf/1vI8hx0rPL8scjpD0dZC+xQaKioJ9L72QKBgQD/VN3AKJtDv38nYSBV\nr9wLRUKxSCmhZluTgT4xChE7eoxA1xkM0pWXD7FCQvz5cqY7tiX8KAaCNwha7z05\n7u3Th9YS+3iWzKDu+ggrvTuPNWrQ92x4nZU+Tl4vTvp89APCnVPgmhpSsjbqCBIb\nRSkxcSI/C9hqsBh9Rdj4ViQvKQKBgQDcw1la99l4Iv+GYBAiner2GzRfrJPFwPK1\nlCRqO4Y7gNmQDlQbPpId4xehtkRC/6Qzk6L8SjrEK6b6PWklNdee6IWiVF5w1pkb\n8nWrRlhxjjMpOaLQhcUVnvFuQDTUxUTceobSlPxzHSqY/Q/OQvd8zeLF1mIgO0F9\nONNPnKvLLwKBgQD5n7bMTua87VMa5NH/89ZlDmmNeMd6i9+r7gcnWnhOdhj4q1JK\nPvcQoL7j0SoRlgz/A61PQLJcTAFXJd3t7bGFxJ9+H2xdweD0wm2KlY7NC6RKeBsM\nMMPgDi32gnhSAR5L/hQq2X4yqxkU5J8PGiaTt8+LY8FJTLAkiUz+PPlTQQKBgQCo\nRJn6NYpkAMElilkiGZ47IjdEaYVlKRGWh6lN87r35dlu7Qz8iy/SagLcNtJHAxYE\nXhbQGEA8wE0Q1fgr7aNBM1iQh6BIf7nKTH+WIhNN0qZ6WL0aFaxIM5Mwhu3987Lu\nHtJe9kKJ94Q9gj4m6HI9hazBQQwgJypeqQ6f0vo67wKBgQC6RJ/gW2a0+BGGqF2V\noDNYX6ALphl/2tKFtraG+VWir5hBwZW9T5m9NQU7F7VHSRnkEJz35woI8x1HLXcm\nKL2PHK239Op9tbAgKidO4Z9pC7j3PF/cGCJbpTcrKPOQiU2kQwZyEM21uPaigErk\n++QQa8St1j4CW5FPOIk8NlVgJQ==\n-----END PRIVATE KEY-----\n',
                client_email: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-unozk@healthy-picks-b95b5.iam.gserviceaccount.com',
                client_id: process.env.FIREBASE_CLIENT_ID || '103294244082333306373',
                auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
                token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
                auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
                client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL || 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-unozk%40healthy-picks-b95b5.iam.gserviceaccount.com',
            },
            databaseURL: process.env.FCM_DATABASE_URL || 'https://healthy-picks-b95b5.firebaseio.com',
        },
        mailer: {
            user: process.env.MAILER_USER || '',
            pass: process.env.MAILER_PASS || '',
        },
        ...envConfig,
    };
}

config = configure();

export default config;
