"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceLocation = void 0;
class DeviceLocation {
    static fromObject(builder) {
        const data = new DeviceLocation();
        data.id = builder.id || null;
        data.userId = builder.userId;
        data.latitude = builder.latitude;
        data.longitude = builder.longitude;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
exports.DeviceLocation = DeviceLocation;
//# sourceMappingURL=DeviceLocation.js.map