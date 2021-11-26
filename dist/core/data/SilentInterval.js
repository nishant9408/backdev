"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilentInterval = void 0;
class SilentInterval {
    static fromObject(builder) {
        const data = new SilentInterval();
        data.name = `${builder.name}:${SilentInterval.prefix}`;
        return data;
    }
}
exports.SilentInterval = SilentInterval;
SilentInterval.prefix = 'silent-push';
//# sourceMappingURL=SilentInterval.js.map