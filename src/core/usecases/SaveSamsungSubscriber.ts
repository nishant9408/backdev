import { Inject, Injectable } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { SamsungSubscriber } from '../data/SamsungSubscriber';
import { SaveSamsungSubscriberDTO } from '../DTO/SaveSamsungSubscriberDTO';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SaveSamsungSubscriber {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(data: SaveSamsungSubscriberDTO): Promise<void> {
        const subscriber = await this.repositoryAdapter.findSamsungSubscriber(data.email);

        if (subscriber) {
            logger.info({ id: subscriber.id, email: subscriber.email }, 'Samsung subscriber already exists');
            return;
        }

        const savedSubscriber = await this.repositoryAdapter.saveSamsungSubscriber(
            SamsungSubscriber.fromObject(data),
        );

        logger.info({ id: savedSubscriber.id, email: savedSubscriber.email }, 'Samsung subscriber saved');
    }
}
