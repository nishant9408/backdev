import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyScore } from '../../../core/data/DailyScore';
import { TargetScore } from '../../../core/data/TargetScore';
import { TargetScoreRepository } from '../../../core/ports/TargetScoreRepository';
import { Converter } from '../../../core/sharedKernel/interfaces/Converter';
import { TargetScoreConverterType } from './converters/TargetScoreConverter';
import { TargetScoreEntity } from './data/TargetScoreEntity';

@Injectable()
export class TargetScoreRepositoryAdapter implements TargetScoreRepository {
    constructor(
        @InjectRepository(TargetScoreEntity)
        private readonly repository: Repository<TargetScoreEntity>,
        @Inject(TargetScoreConverterType)
        private readonly targetScoreConverter: Converter<TargetScore, TargetScoreEntity>,
    ) { }

    public async saveTargetScore(data: TargetScore): Promise<TargetScore> {
        const entityToSave = TargetScoreEntity.fromObject(data);
        const entity = await this.repository.save(entityToSave);
        return this.targetScoreConverter.to(entity);
    }

    public async getTargetScoresByUserId(userId: number): Promise<TargetScore[]> {
        const entities = await this.repository.find({
            where: {
                userId,
            },
            order: {
                updatedAt: 'DESC',
            },
        });
        return entities.map(e => TargetScore.fromObject(e));
    }
}
