import { DeviceLocation } from '../data/DeviceLocation';

export interface LocationRepository {
    findLocation(userId: string): Promise<DeviceLocation | null>;
    saveLocation(location: DeviceLocation): Promise<DeviceLocation>;
}

const LocationRepositoryType = Symbol.for('LocationRepository');
export { LocationRepositoryType };
