"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
class AuthUser {
    static fromObject(builder) {
        const newUser = new AuthUser();
        newUser.accessToken = builder.accessToken;
        newUser.userId = builder.userId;
        return newUser;
    }
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=AuthUser.js.map