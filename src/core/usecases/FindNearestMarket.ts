import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { FoundMarket } from '../data/FoundMarket';
import { Point } from '../data/Point';
import { FindNearestMarketDTO } from '../DTO/FindNearestMarketDTO';
import { MapProvider, MapProviderType } from '../ports/MapProvider';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class FindNearestMarket {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        @Inject(MapProviderType)
        private readonly mapProviderAdapter: MapProvider,
    ) { }

    public async execute(request: FindNearestMarketDTO): Promise<FoundMarket | null> {
        const { userId } = request;

        const location = await this.repositoryAdapter.findLocation(userId);
        if (!location) {
            logger.info({ userId }, 'No device location');
            return null;
        }

        return await this.mapProviderAdapter.findNearest(Point.fromObject(location));
    }
}
