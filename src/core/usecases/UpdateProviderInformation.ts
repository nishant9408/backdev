import { Inject, Injectable } from '@nestjs/common';
import { HealthProvider } from '../data/HealthProvider';
import { UpdateProviderInformationDTO } from '../DTO/UpdateProviderInformationDTO';
import { HealthProviderPort, HealthProviderPortType } from '../ports/HealthProviderPort';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class UpdateProviderInformation {
    constructor(
        @Inject(HealthProviderPortType)
        private readonly healthProviderAdapter: HealthProviderPort,
        @Inject(RepositoryType)
        private readonly repository: Repository,
    ) { }

    public async execute(request: UpdateProviderInformationDTO): Promise<HealthProvider> {
        const healthProvider = HealthProvider.fromObject(request);

        const updatedData = await this.healthProviderAdapter.refreshToken(healthProvider);
        return await this.repository.saveHealthProviderData({
            ...healthProvider,
            ...updatedData,
        });
    }
}
