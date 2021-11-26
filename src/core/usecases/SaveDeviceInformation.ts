import { Inject, Injectable } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { Device } from '../data/Device';
import { SaveDeviceInformationDTO } from '../DTO/SaveDeviceInformationDTO';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SaveDeviceInformation {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(data: SaveDeviceInformationDTO): Promise<Device> {
        const info = await this.repositoryAdapter.findDeviceData(data.userId);
        const deviceInfoToSave = Device.fromObject({
            ...(info || { }),
            ...data,
        });
        const savedDevInfo = await this.repositoryAdapter.saveDevice(deviceInfoToSave);

        logger.info({ device_id: savedDevInfo.userId }, 'Device information saved');

        return savedDevInfo;
    }
}
