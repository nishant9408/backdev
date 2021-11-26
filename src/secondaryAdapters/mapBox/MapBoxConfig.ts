// tslint:disable-next-line:no-require-imports no-var-requires
const mbxClient = require('@mapbox/mapbox-sdk');
// tslint:disable-next-line:no-require-imports no-var-requires
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
import config from '../../configuration/config/Config';

const accessToken = config.mapBox.accessToken;
const baseClient = mbxClient({ accessToken });

function getGeocodingService() {
    return mbxGeocoding(baseClient);
}

export { getGeocodingService };
