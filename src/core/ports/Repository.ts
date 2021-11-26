import { DailyScoreRepository } from './DailyScoreRepository';
import { DeviceRepository } from './DeviceRepository';
import { HealthProviderRepository } from './HealthProviderRepository';
import { HealthRepository } from './HealthRepository';
import { LocationRepository } from './LocationRepository';
import { RecommendationRepository } from './RecommendationRepository';
import { SamsungRepository } from './SamsungRepository';

export interface Repository extends
    DeviceRepository,
    HealthRepository,
    LocationRepository,
    HealthProviderRepository,
    RecommendationRepository,
    DailyScoreRepository,
    SamsungRepository { }

const RepositoryType = Symbol.for('Repository');
export { RepositoryType };
