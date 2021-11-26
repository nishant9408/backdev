"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
const admin = require("firebase-admin");
const Config_1 = require("./config/Config");
const firebase = admin.initializeApp({
    credential: admin.credential.cert(Config_1.default.firebase.serviceAccount),
    databaseURL: Config_1.default.firebase.databaseURL,
});
exports.firebase = firebase;
//# sourceMappingURL=FirebaseMessaging.js.map