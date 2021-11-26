"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundMarket = void 0;
class FoundMarket {
    static fromObject(builder) {
        const data = new FoundMarket();
        data.latitude = builder.latitude;
        data.longitude = builder.longitude;
        data.link = builder.link;
        data.userLocation = {
            latitude: builder.userLocation.latitude,
            longitude: builder.userLocation.longitude,
        };
        return data;
    }
}
exports.FoundMarket = FoundMarket;
//# sourceMappingURL=FoundMarket.js.map