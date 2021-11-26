import { Inject, Injectable } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { Notification, NotificationPriority } from '../data/Notification';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SendDailySilencePush {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationServiceAdapter: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(notificationToken: string): Promise<void> {
        logger.info({ notificationToken, message: 'SendDailySilencePush' });
        await this.notificationServiceAdapter.send(Notification.fromObject({
            token: notificationToken,
            data: {
                'action-required': 'SEND_HEALTH_DATA',
            },
            apnsPriority: NotificationPriority.NORMAL,
        }));
    }
}
