"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamsungSubscriber = void 0;
class SamsungSubscriber {
    static fromObject(builder) {
        const data = new SamsungSubscriber();
        data.id = builder.id || null;
        data.email = builder.email;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
exports.SamsungSubscriber = SamsungSubscriber;
//# sourceMappingURL=SamsungSubscriber.js.map