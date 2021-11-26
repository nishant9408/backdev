"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitbitAuth = void 0;
class FitbitAuth {
    static fromObject(builder) {
        const data = new FitbitAuth();
        data.accessToken = builder.access_token;
        data.expiresIn = builder.expires_in;
        data.refreshToken = builder.refresh_token;
        data.scope = builder.scope;
        data.tokenType = builder.token_type;
        data.userId = builder.user_id;
        return data;
    }
}
exports.FitbitAuth = FitbitAuth;
//# sourceMappingURL=FitbitAuth.js.map