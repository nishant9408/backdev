import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TargetScore } from '../data/TargetScore';
import { TargetScoreRepository, TargetScoreRepositoryType } from '../ports/TargetScoreRepository';
import { GenerateTargetScore } from './GenerateTargetScore';

@Injectable()
export class ProvideTargetScore {
    constructor(
        @Inject(TargetScoreRepositoryType)
        private readonly targetScoreRepository: TargetScoreRepository,
        private readonly generateTargetScore: GenerateTargetScore,
    ) { }

    public async execute(userId: number): Promise<TargetScore> {
        const data = await this.targetScoreRepository.getTargetScoresByUserId(userId);
        if (!data.length) {
            return await this.generateTargetScore.execute(userId);
        }
        return data[0];
    }
}
