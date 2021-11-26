import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import 'moment-timezone';
import { DailyScore } from '../data/DailyScore';
import { ProvideDailyScoreDTO } from '../DTO/ProvideDailyScoreDTO';
import { Repository, RepositoryType } from '../ports/Repository';
import { UserRepository, UserRepositoryType } from '../user/port/UserRepository';

@Injectable()
export class ProvideDailyScore {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
    ) { }

    public async execute(request: ProvideDailyScoreDTO): Promise<DailyScore | null> {
        const [ user, dailyScores ] = await Promise.all([
            this.userRepository.findById(request.userId),
            this.repositoryAdapter.getTwoDailyScoreByUserId(request.userId),
        ]);
        if (!dailyScores.length) return null;
        if (dailyScores.length === 1) return dailyScores[0];
        if (!user) return dailyScores[0]; // return latest;

        const { timezone } = user;
        const date = moment.tz(new Date(), timezone);
        return date.hours() < 11 ? dailyScores[1] : dailyScores[0];
    }
}
