import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { HandleActivityDTO } from '../DTO/HandleActivityDTO';
import { HealthProviderPort, HealthProviderPortType } from '../ports/HealthProviderPort';
import { Repository, RepositoryType } from '../ports/Repository';
import { UpdateProviderInformation } from './UpdateProviderInformation';

@Injectable()
export class HandleActivity {
    constructor(
        @Inject(HealthProviderPortType)
        private readonly healthProviderAdapter: HealthProviderPort,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        private readonly updateProviderInformation: UpdateProviderInformation,
    ) { }

    public async execute(request: HandleActivityDTO): Promise<void> {
        // const { userId } = request;
        //
        // let providerData = await this.repositoryAdapter.getHealthProviderDataByUserId(userId);
        // if (!providerData) {
        //     throw new BadRequestException('No such userID');
        // }

        // providerData = await this.updateProviderInformation.execute(providerData);
        // const activity = await this.healthProviderAdapter.getTodayLastActivity(providerData);

        // if (activity) {}
    }
}
