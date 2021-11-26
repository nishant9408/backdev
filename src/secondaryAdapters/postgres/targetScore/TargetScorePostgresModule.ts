import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetScoreRepositoryType } from '../../../core/ports/TargetScoreRepository';
import { TargetScoreConverter, TargetScoreConverterType } from './converters/TargetScoreConverter';

import { TargetScoreEntity } from './data/TargetScoreEntity';
import { TargetScoreRepositoryAdapter } from './TargetScoreRepositoryAdapter';

@Module({
    imports: [ TypeOrmModule.forFeature([
        TargetScoreEntity,
    ]) ],
    providers: [
        {
            provide: TargetScoreConverterType,
            useClass: TargetScoreConverter,
        },
        {
            provide: TargetScoreRepositoryType,
            useClass: TargetScoreRepositoryAdapter,
        },
    ],
    exports: [
        TargetScoreRepositoryType,
    ],
})
export class TargetScorePostgresModule {
}
