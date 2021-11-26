import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import config from '../../configuration/config/Config';
import logger from '../../configuration/Logger';
import { SaveDailyScoreParamsDTO } from '../DTO/SaveDailyScoreParamsDTO';
import { Repository, RepositoryType } from '../ports/Repository';
import { GenerateDailyScore } from './GenerateDailyScore';

@Injectable()
export class ScheduleFitbitPulling {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly generateDailyScore: GenerateDailyScore,
    ) { }

    public async execute(userId: number, timezone: string): Promise<void> {

        const job = await this.createPush(userId, timezone);
        const jobName = `${userId}-fitbit-data-pull`;
        this.runJob(job, jobName);

        logger.info({ userId }, 'daily fitbit data pull init success');
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

    private async createPush(userId: number, timezone: string): Promise<CronJob> {

        const time = config.jobs.dailyScoreNotifications.silentTime;

        const onComplete = null;
        const start = false;

        return new CronJob(
            time,
            // tslint:disable-next-line:no-object-literal-type-assertion
            () => this.generateDailyScore.execute({ userId } as SaveDailyScoreParamsDTO),
            onComplete,
            start,
            timezone,
        );
    }
}
