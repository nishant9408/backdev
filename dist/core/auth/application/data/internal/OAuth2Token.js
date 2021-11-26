"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Token = void 0;
class OAuth2Token {
    static fromObject(builder) {
        const token = new OAuth2Token();
        token.accessToken = builder.accessToken;
        token.refreshToken = builder.refreshToken;
        token.accessTokenExpiresAt = builder.accessTokenExpiresAt;
        token.refreshTokenExpiresAt = builder.refreshTokenExpiresAt;
        token.scope = builder.scope;
        token.userId = builder.userId;
        return token;
    }
}
exports.OAuth2Token = OAuth2Token;
//# sourceMappingURL=OAuth2Token.js.map