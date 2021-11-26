import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SaveTimezoneDTO } from '../DTO/SaveTimezoneDTO';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SaveTimezone {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(data: SaveTimezoneDTO): Promise<void> {
        const info = await this.repositoryAdapter.findDeviceData(data.userId);

        if (!info) {
            throw new BadRequestException('Unknown device');
        }

        if (info.timezone !== data.timezone) {
            const updatedInfo = await this.repositoryAdapter.saveDevice({
                ...info,
                timezone: data.timezone,
            });
        }
    }
}
