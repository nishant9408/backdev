import { TargetScore } from '../data/TargetScore';

export interface TargetScoreRepository {
    saveTargetScore(data: TargetScore): Promise<TargetScore>;
    getTargetScoresByUserId(userId: number): Promise<TargetScore[]>;
}

const TargetScoreRepositoryType = Symbol.for('TargetScoreRepository');
export { TargetScoreRepositoryType };
