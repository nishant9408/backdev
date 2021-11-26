"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthProvider = void 0;
class HealthProvider {
    static fromObject(builder) {
        const data = new HealthProvider();
        data.id = builder.id || null;
        data.uId = builder.uId;
        data.name = builder.name;
        data.timezone = builder.timezone || null;
        data.accessToken = builder.accessToken || null;
        data.refreshToken = builder.refreshToken || null;
        data.expiresIn = builder.expiresIn || null;
        data.scope = builder.scope || null;
        data.userId = builder.userId || null;
        data.tokenType = builder.tokenType || null;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
exports.HealthProvider = HealthProvider;
//# sourceMappingURL=HealthProvider.js.map