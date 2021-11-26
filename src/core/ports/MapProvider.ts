import { FoundMarket } from '../data/FoundMarket';
import { Point } from '../data/Point';

export interface MapProvider {
    findNearest(location: Point): Promise<FoundMarket | null>;
}

const MapProviderType = Symbol.for('MapProvider');
export { MapProviderType };
