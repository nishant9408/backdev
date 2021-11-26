import { Inject, Injectable } from '@nestjs/common';
import { Health } from '../data/Health';
import { HealthProvider } from '../data/HealthProvider';
import { ProvideHealthDataFromProviderDTO } from '../DTO/ProvideHealthDataFromProviderDTO';
import { HealthProviderPort, HealthProviderPortType } from '../ports/HealthProviderPort';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class ProvideHealthDataFromProvider {
    constructor(
        @Inject(HealthProviderPortType)
        private readonly healthProviderAdapter: HealthProviderPort,
        @Inject(RepositoryType)
        private readonly repository: Repository,
    ) { }

    public async execute(request: ProvideHealthDataFromProviderDTO): Promise<Health> {
        const healthProvider = HealthProvider.fromObject(request);
        const isTokenValid = await this.healthProviderAdapter.isAccessTokenValid(healthProvider);

        let updatedHealthProvider = healthProvider;
        if (!isTokenValid) {
            const updatedData = await this.healthProviderAdapter.refreshToken(healthProvider);
            updatedHealthProvider = {
                ...updatedHealthProvider,
                ...updatedData,
                id: updatedHealthProvider.id,
            };
        }

        const { health, timezone } = await this.healthProviderAdapter.getHealthData(updatedHealthProvider);
        await this.repository.saveHealthProviderData({
            ...updatedHealthProvider, timezone,
        });

        return health;
    }
}
