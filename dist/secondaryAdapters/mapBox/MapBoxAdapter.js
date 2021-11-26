"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapBoxAdapter = void 0;
const common_1 = require("@nestjs/common");
const geolib = require("geolib");
const ramda_1 = require("ramda");
const Config_1 = require("../../configuration/config/Config");
const FoundMarket_1 = require("../../core/data/FoundMarket");
const Point_1 = require("../../core/data/Point");
const MapBoxConfig_1 = require("./MapBoxConfig");
let MapBoxAdapter = class MapBoxAdapter {
    constructor() {
        this.geocodingService = (0, MapBoxConfig_1.getGeocodingService)();
    }
    findNearest(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const { radius, list: markets } = Config_1.default.markets;
            const queries = markets.map(({ name }) => ({
                mode: 'mapbox.places',
                query: `${name}`,
                limit: 5,
                bbox: this.getBboxFromPoint(location, radius),
            }));
            const results = yield Promise.all(queries.map(query => this.geocodingService.forwardGeocode(query).send()));
            const foundMarkets = (0, ramda_1.flatten)(results.map(response => response.body.features)).filter(market => market.relevance > 0.8);
            const marketsWithinRadius = foundMarkets.filter(({ center: [longitude, latitude] }) => geolib.isPointWithinRadius({ latitude, longitude }, location, radius));
            if (!marketsWithinRadius.length)
                return null;
            const nearest = geolib.findNearest(location, marketsWithinRadius.map(({ center: [longitude, latitude] }) => ({ latitude, longitude })));
            const nearestMarketLocation = Point_1.Point.fromObject({
                longitude: nearest['longitude'],
                latitude: nearest['latitude'],
            });
            const marketLink = this.determineMarketLinkByLocation(nearestMarketLocation, marketsWithinRadius);
            return FoundMarket_1.FoundMarket.fromObject({
                longitude: nearest['longitude'],
                latitude: nearest['latitude'],
                link: marketLink,
                userLocation: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
            });
        });
    }
    determineMarketLinkByLocation(nearestMarketLocation, marketsWithinRadius) {
        const nearestMarket = marketsWithinRadius.find(market => market.center[0] === nearestMarketLocation.longitude
            && market.center[1] === nearestMarketLocation.latitude);
        if (!nearestMarket)
            throw new common_1.InternalServerErrorException('nearest market error');
        const { text, place_name: placeName, matching_text: matchingText, matching_place_name: matchingPlaceName, } = nearestMarket;
        const marketData = Config_1.default.markets.list.find(market => {
            const regex = new RegExp(`${market.name.toLowerCase()}`, 'gmi');
            return text && text.search(regex) !== -1 ||
                matchingText && matchingText.search(regex) !== -1 ||
                matchingPlaceName && matchingPlaceName.search(regex) !== -1 ||
                placeName && placeName.search(regex) !== -1;
        });
        if (!marketData)
            throw new common_1.InternalServerErrorException('nearest market error');
        return marketData.link;
    }
    getBboxFromPoint(point, radius) {
        const bbox = geolib.getBoundsOfDistance(point, radius);
        const [[minLongitude, maxLongitude], [minLatitude, maxLatitude],] = [bbox.map(point => point.longitude), bbox.map(point => point.latitude)]
            .map(coordinates => coordinates.sort((a, b) => a - b));
        return [minLongitude, minLatitude, maxLongitude, maxLatitude];
    }
};
MapBoxAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MapBoxAdapter);
exports.MapBoxAdapter = MapBoxAdapter;
//# sourceMappingURL=MapBoxAdapter.js.map