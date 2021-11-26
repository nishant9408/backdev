import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as geolib from 'geolib';
import { flatten } from 'ramda';
import config from '../../configuration/config/Config';

import { FoundMarket } from '../../core/data/FoundMarket';
import { Point } from '../../core/data/Point';
import { MapProvider } from '../../core/ports/MapProvider';
import { getGeocodingService } from './MapBoxConfig';

@Injectable()
export class MapBoxAdapter implements MapProvider {
    private readonly geocodingService;

    constructor() {
        this.geocodingService = getGeocodingService();
    }

    public async findNearest(location: Point): Promise<FoundMarket | null> {
        const { radius, list: markets } = config.markets;

        const queries = markets.map(({ name }) => ({
            mode: 'mapbox.places',
            query: `${name}`,
            limit: 5,
            bbox: this.getBboxFromPoint(location, radius),
        }));

        const results: any[] = await Promise.all(queries.map(query => this.geocodingService.forwardGeocode(query).send()));
        const foundMarkets = flatten(results.map(response => response.body.features)).filter(market => market.relevance > 0.8);
        const marketsWithinRadius = foundMarkets.filter(({ center: [ longitude, latitude ] }) => geolib.isPointWithinRadius(
            { latitude, longitude },
            location,
            radius,
        ));

        if (!marketsWithinRadius.length) return null;

        const nearest = geolib.findNearest(
            location,
            marketsWithinRadius.map(({ center: [ longitude, latitude ] }) => ({ latitude, longitude })),
        );

        const nearestMarketLocation = Point.fromObject({
            longitude: nearest['longitude'],
            latitude: nearest['latitude'],
        });

        const marketLink = this.determineMarketLinkByLocation(nearestMarketLocation, marketsWithinRadius);

        return FoundMarket.fromObject({
            longitude: nearest['longitude'],
            latitude: nearest['latitude'],
            link: marketLink,
            userLocation: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        });
    }

    private determineMarketLinkByLocation(nearestMarketLocation: Point, marketsWithinRadius): string {
        const nearestMarket = marketsWithinRadius.find(market =>
            market.center[0] === nearestMarketLocation.longitude
            && market.center[1] === nearestMarketLocation.latitude,
        );

        if (!nearestMarket) throw new InternalServerErrorException('nearest market error');

        const {
            text,
            place_name: placeName,
            matching_text: matchingText,
            matching_place_name: matchingPlaceName,
        } = nearestMarket;

        const marketData = config.markets.list.find(market => {
            const regex = new RegExp(`${market.name.toLowerCase()}`, 'gmi') ;
            return text && text.search(regex) !== -1 ||
                matchingText && matchingText.search(regex) !== -1 ||
                matchingPlaceName && matchingPlaceName.search(regex) !== -1 ||
                placeName && placeName.search(regex) !== -1;
        });

        if (!marketData) throw new InternalServerErrorException('nearest market error');

        return marketData.link;
    }

    private getBboxFromPoint(point: Point, radius: number): number[] {
        const bbox = geolib.getBoundsOfDistance(point, radius);

        const [
            [ minLongitude, maxLongitude ],
            [ minLatitude, maxLatitude ],
        ] = [ bbox.map(point => point.longitude), bbox.map(point => point.latitude) ]
            .map(coordinates => coordinates.sort((a, b) => a - b));

        return [ minLongitude, minLatitude, maxLongitude, maxLatitude ];
    }
}
