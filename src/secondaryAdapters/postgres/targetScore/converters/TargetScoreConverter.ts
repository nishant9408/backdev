import { Injectable } from '@nestjs/common';
import { TargetScore } from '../../../../core/data/TargetScore';
import { Converter } from '../../../../core/sharedKernel/interfaces/Converter';
import { TargetScoreEntity } from '../data/TargetScoreEntity';

@Injectable()
export class TargetScoreConverter implements Converter<TargetScore, TargetScoreEntity> {
    public from(from: TargetScore): TargetScoreEntity {
        return TargetScoreEntity.fromObject(from);
    }

    public to(to: TargetScoreEntity): TargetScore {
        return TargetScore.fromObject(to);
    }
}

const TargetScoreConverterType = Symbol.for('TargetScoreConverter');
export { TargetScoreConverterType };
