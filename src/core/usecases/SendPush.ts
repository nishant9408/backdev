import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from '../data/Notification';
import { NotificationType } from '../data/NotificationType';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SendPush {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationServiceAdapter: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(userId: string, token?: string, notificationType?: NotificationType | null): Promise<void> {
        let notificationToken = token;

        const provider = await this.repositoryAdapter.findDeviceData(userId);
        if (!provider) throw new NotFoundException('device not found');

        if (!notificationToken) {
            if (!provider.notificationToken) throw new NotFoundException('token not found');

            notificationToken = provider.notificationToken;
        }

        const notification = Notification.fromObject({
            body: 'Recharge your energy with 300ml of plant-based milk with 2 fruits',
            title: '🥇Great training, keep going!',
            data: {
                storeLon: '30.465078',
                storeLat: '50.519695',
                userLat: '30.46507',
                userLon: '50.519696',
                link: 'https://megamarket.ua',
                notificationType: notificationType || NotificationType.DAILY,
            },
            token: notificationToken,
        });

        await this.notificationServiceAdapter.send(notification);
    }
}
