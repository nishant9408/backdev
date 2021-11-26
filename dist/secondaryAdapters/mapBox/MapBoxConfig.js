"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeocodingService = void 0;
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const Config_1 = require("../../configuration/config/Config");
const accessToken = Config_1.default.mapBox.accessToken;
const baseClient = mbxClient({ accessToken });
function getGeocodingService() {
    return mbxGeocoding(baseClient);
}
exports.getGeocodingService = getGeocodingService;
//# sourceMappingURL=MapBoxConfig.js.map