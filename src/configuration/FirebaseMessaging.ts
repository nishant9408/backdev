import * as admin from 'firebase-admin';
import config from './config/Config';

const firebase = admin.initializeApp({
    credential: admin.credential.cert(config.firebase.serviceAccount as admin.ServiceAccount),
    databaseURL: config.firebase.databaseURL,
});

export { firebase };
