import { Inject, Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import logger from '../../configuration/Logger';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';
import { UserRepository, UserRepositoryType } from '../user/port/UserRepository';
import { ScheduleDailyScorePushes } from './ScheduleDailyScorePushes';
import { ScheduleFitbitPulling } from './ScheduleFitbitPulling';
import { ScheduleSilentDailyPushes } from './ScheduleSilentDailyPushes';

@Injectable()
export class InitDailyPushes  {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationService: NotificationService,
        @Inject(UserRepositoryType)
        private readonly userRepositoryType: UserRepository,
        @Inject(NotificationServiceType)
        private readonly notificationServiceType: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        private readonly scheduleDailyScorePushes: ScheduleDailyScorePushes,
        private readonly scheduleSilentDailyScorePushes: ScheduleSilentDailyPushes,
        private readonly scheduleFitbitPulling: ScheduleFitbitPulling,
    ) { }

    @Timeout(10000)
    async execute() {
        const users = await this.userRepositoryType.findNotifiable();

        for (const { id, timezone, notificationToken } of users) {
            // if (id !== 131) continue;
            const dto = { userId: id!, timezone, notificationToken: notificationToken! };
            await Promise.all([
                this.scheduleDailyScorePushes.execute(dto),
                this.scheduleSilentDailyScorePushes.execute(dto),
            ]).catch((e) => {
                logger.info(e);
            });
        }

        let fitbitUsers = await this.repositoryAdapter.getFitbitProviders();
        fitbitUsers = fitbitUsers.filter(u => u.accessToken);
        const usersWithFitbit = await Promise.all(fitbitUsers.map(u => this.userRepositoryType.findById(u.uId as number)));

        const promises = [];
        for (const user of usersWithFitbit) {
            if (!user) continue;
            // if (user.id !== 131) continue;
            const { id, timezone } = user;
            if (id && timezone) {
                await this.scheduleFitbitPulling.execute(id, timezone).catch((e) => {
                    logger.info(e);
                });
            }
        }

        await Promise.all(promises);
    }
}
