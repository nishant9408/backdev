"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
    static fromObject(builder) {
        const data = new Point();
        data.latitude = builder.latitude;
        data.longitude = builder.longitude;
        return data;
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map