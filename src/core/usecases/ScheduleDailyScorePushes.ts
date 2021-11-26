import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import config from '../../configuration/config/Config';
import logger from '../../configuration/Logger';
import { ScheduleDailyScorePushesDTO } from '../DTO/ScheduleDailyScorePushesDTO';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';
import { SendDailyScorePush } from './SendDailyScorePush';

@Injectable()
export class ScheduleDailyScorePushes {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationServiceAdapter: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly sendDailyScorePush: SendDailyScorePush,
    ) { }

    public async execute(request: ScheduleDailyScorePushesDTO): Promise<void> {
        const { userId } = request;

        const job = await this.createPush(request);
        const jobName = `${userId}-daily-score-push`;
        this.runJob(job, jobName);

        logger.info({ userId }, 'daily score push init success');
    }

    private runJob(job: CronJob, jobName: string): void {
        try {
            this.schedulerRegistry.addCronJob(jobName, job);
            job.start();
        } catch (e) {
            this.schedulerRegistry.deleteCronJob(jobName);
            this.schedulerRegistry.addCronJob(jobName, job);
            job.start();
        }
    }

    private async createPush(data: ScheduleDailyScorePushesDTO): Promise<CronJob> {
        const { userId, notificationToken, timezone } = data;

        const time = config.jobs.dailyScoreNotifications.time;

        const onComplete = null;
        const start = false;

        return new CronJob(
            time,
            () => this.sendDailyScorePush.execute(userId, notificationToken),
            onComplete,
            start,
            timezone,
        );
    }
}
