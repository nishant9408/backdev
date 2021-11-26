import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Notification } from '../data/Notification';
import { NotificationType } from '../data/NotificationType';
import { NotificationService, NotificationServiceType } from '../ports/NotificationService';
import { Repository, RepositoryType } from '../ports/Repository';
import { TargetScoreRepository, TargetScoreRepositoryType } from '../ports/TargetScoreRepository';

@Injectable()
export class SendTargetScorePush {
    constructor(
        @Inject(NotificationServiceType)
        private readonly notificationServiceAdapter: NotificationService,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        @Inject(TargetScoreRepositoryType)
        private readonly targetScoreRepository: TargetScoreRepository,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) { }

    public async execute(userId: number, notificationToken: string, jobName?: string): Promise<void> {
        const targetScores = await this.targetScoreRepository.getTargetScoresByUserId(userId);

        if (!targetScores.length) throw new InternalServerErrorException('no target score');
        const lastTargetScore = targetScores[0];

        const progress = lastTargetScore.monthlyScore >= 7 ? 'on' : 'off';

        const notification = Notification.fromObject({
            token: notificationToken!,
            title: '✨Hey! Get your Monthly Score',
            body: `Based on your monthly activity, you are ${progress} your target. Your monthly healthy score is ${lastTargetScore.monthlyScore}. Tap to see more details...`,
            data: {
                notificationType: NotificationType.TARGET,
            },
        });

        await this.notificationServiceAdapter.send(notification);

        if (jobName) {
            this.schedulerRegistry.deleteCronJob(jobName);
        }
    }
}
