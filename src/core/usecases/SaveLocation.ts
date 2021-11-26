import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { DeviceLocation } from '../data/DeviceLocation';
import { SaveLocationDTO } from '../DTO/SaveLocationDTO';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SaveLocation {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(data: SaveLocationDTO): Promise<DeviceLocation> {
        const info = await this.repositoryAdapter.findDeviceData(data.userId);

        if (!info) {
            throw new BadRequestException('Unknown device');
        }

        const prevLocation = await this.repositoryAdapter.findLocation(data.userId);
        const savedLocation = await this.repositoryAdapter.saveLocation(DeviceLocation.fromObject({
            ...(prevLocation || { }),
            ...data,
        }));

        logger.info({ id: savedLocation.id }, 'Device location saved');

        return savedLocation;
    }
}
