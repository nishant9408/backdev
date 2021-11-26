import { Inject, Injectable } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { Notification } from '../data/Notification';
import { NotificationType } from '../data/NotificationType';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';
import { UserRepository, UserRepositoryType } from '../user/port/UserRepository';

@Injectable()
export class SendDailyScorePush {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationServiceAdapter: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        @Inject(UserRepositoryType)
        private readonly userRepoAdapter: UserRepository,
    ) { }

    public async execute(userId: number, notificationToken: string): Promise<void> {
        logger.info({ userId, notificationToken, message: 'SendDailyScorePush.execute' });
        const scoreData = await this.repositoryAdapter.getDailyScoreByUserId(userId);
        if (!notificationToken.length) {
            const user = await this.userRepoAdapter.findById(userId);
            if (!user?.notificationToken.length) {
                logger.error({ userId, message: 'no notification token to send push' });
                return;
            }
        }

        if (!scoreData || scoreData.score === null) {
            logger.error({ userId, message: 'no score to send push' });
            return;
        }

        const progress = scoreData.score >= 7 ? 'on' : 'off';

        const notification = Notification.fromObject({
            token: notificationToken!,
            title: '✨Hey! Get your Daily Booster',
            body: `Based on your activity, you are ${progress} your target. Your daily healthy score is ${scoreData.score}. Tap to see more details...`,
            data: {
                notificationType: NotificationType.BOOSTER,
            },
        });

        logger.info({ userId, notification, message: 'SendDailyScorePush.execute' });
        await this.notificationServiceAdapter.send(notification);
    }
}
