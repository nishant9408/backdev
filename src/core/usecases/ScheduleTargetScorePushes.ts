import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import config from '../../configuration/config/Config';
import logger from '../../configuration/Logger';
import { ScheduleDailyScorePushesDTO } from '../DTO/ScheduleDailyScorePushesDTO';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';
import { SendTargetScorePush } from './SendTargetScorePush';

@Injectable()
export class ScheduleTargetScorePushes {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationServiceAdapter: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly sendTargetScorePush: SendTargetScorePush,
    ) { }

    public async execute(request: ScheduleDailyScorePushesDTO): Promise<void> {
        const { userId } = request;

        const jobName = `${userId}-target-score-push`;
        const job = await this.createPush(request, jobName);
        this.runJob(job, jobName);

        logger.info({ userId }, 'target score push init success');
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

    private async createPush(data: ScheduleDailyScorePushesDTO, jobName: string): Promise<CronJob> {
        const { userId, notificationToken, timezone } = data;

        const time = config.jobs.targetScoreNotifications.time;

        const onComplete = null;
        const start = false;

        return new CronJob(
            time,
            () => this.sendTargetScorePush.execute(userId, notificationToken, jobName),
            onComplete,
            start,
            timezone,
        );
    }
}
