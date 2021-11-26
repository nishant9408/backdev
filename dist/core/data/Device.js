"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
class Device {
    static fromObject(builder) {
        const data = new Device();
        data.userId = builder.userId;
        data.timezone = builder.timezone;
        data.allowMailing = builder.allowMailing;
        data.email = builder.email || null;
        data.notificationToken = builder.notificationToken || null;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map