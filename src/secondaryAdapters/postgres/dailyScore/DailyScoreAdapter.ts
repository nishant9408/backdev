import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { DailyScore } from '../../../core/data/DailyScore';
import { DailyScoreRepository } from '../../../core/ports/DailyScoreRepository';
import { Converter } from '../../../core/sharedKernel/interfaces/Converter';
import { DailyScoreConverterType } from './converters/DailyScoreConverter';
import { DailyScoreEntity } from './data/DailyScoreEntity';

@Injectable()
export class DailyScoreAdapter implements DailyScoreRepository {
    constructor(
        @InjectRepository(DailyScoreEntity)
        private readonly dailyScoreRepository: Repository<DailyScoreEntity>,
        @Inject(DailyScoreConverterType)
        private readonly dailyScoreConverter: Converter<DailyScore, DailyScoreEntity>,
    ) { }

    public async saveDailyScore(data: DailyScore): Promise<DailyScore> {
        const entityToSave = this.dailyScoreConverter.from(data);
        const entity = await this.dailyScoreRepository.save(entityToSave);
        return this.dailyScoreConverter.to(entity);
    }

    public async getDailyScoreByUserId(userId: number): Promise<DailyScore | null> {
        const whereCond = { userId };
        const entity = await this.getRows(whereCond);
        return entity.length ? this.dailyScoreConverter.to(entity[0]) : null;
    }

    public async getDailyForPeriod(userId: number, since?: Date): Promise<DailyScore[]> {
        const whereCond = {
            userId,
            ...(since ? { createdAt: MoreThanOrEqual(since) } : { }),
        };
        const entity = await this.getRows(whereCond);
        return entity.map(e => this.dailyScoreConverter.to(e));
    }

    public async getTwoDailyScoreByUserId(userId: number): Promise<DailyScore[]> {
        const where = {
            userId,
        };
        const entity = await this.dailyScoreRepository.find({
            where,
            take: 2,
            order: {
                createdAt: 'DESC',
            },
        });
        return entity.map(e => this.dailyScoreConverter.to(e));
    }

    private async getRows(where): Promise<DailyScoreEntity[]> {
        return await this.dailyScoreRepository.find({
            where,
            order: {
                createdAt: 'DESC',
            },
        });
    }
}
