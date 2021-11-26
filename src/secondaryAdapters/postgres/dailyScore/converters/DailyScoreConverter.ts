import { Injectable } from '@nestjs/common';
import { DailyScore } from '../../../../core/data/DailyScore';
import { Converter } from '../../../../core/sharedKernel/interfaces/Converter';
import { DailyScoreEntity } from '../data/DailyScoreEntity';

@Injectable()
export class DailyScoreConverter implements Converter<DailyScore, DailyScoreEntity> {
    public from(from: DailyScore): DailyScoreEntity {
        return DailyScoreEntity.fromObject(from);
    }

    public to(to: DailyScoreEntity): DailyScore {
        return DailyScore.fromObject(to);
    }
}

const DailyScoreConverterType = Symbol.for('DailyScoreConverter');
export { DailyScoreConverterType };
