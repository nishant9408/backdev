import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository, RepositoryType } from '../../core/ports/Repository';
import { FoodAndScoreOutputMapper, FoodAndScoreOutputMapperType } from '../../primaryAdapters/rest/food/mappers/FoodAndScoreOutputMapper';
import { applyMixins } from './applyMixins';
import { DailyScoreConverter, DailyScoreConverterType } from './dailyScore/converters/DailyScoreConverter';
import { DailyScoreAdapter } from './dailyScore/DailyScoreAdapter';
import { DailyScoreEntity } from './dailyScore/data/DailyScoreEntity';
import { HealthProviderEntity } from './health/data/HealthProviderEntity';
import { HealthProviderAdapter } from './health/HealthProviderAdapter';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DailyScoreEntity,
            HealthProviderEntity,
        ]),
    ],
    providers: [
        {
            provide: DailyScoreConverterType,
            useClass: DailyScoreConverter,
        },
        {
            provide: FoodAndScoreOutputMapperType,
            useClass: FoodAndScoreOutputMapper,
        },

        DailyScoreAdapter,
        HealthProviderAdapter,

        {
            provide: RepositoryType,
            useFactory: (...adapters) => applyMixins<Repository>(adapters),
            inject: [
                DailyScoreAdapter,
                HealthProviderAdapter,
            ],
        },
    ],
    exports: [
        RepositoryType,
    ],
})
export class RepositoryModule { }
