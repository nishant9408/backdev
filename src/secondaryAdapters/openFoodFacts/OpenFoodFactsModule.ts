import { Module } from '@nestjs/common';
import { FoodProviderType } from '../../core/ports/FoodProvider';
import { FoodInformationMapper, FoodInformationMapperType } from './mappers/FoodInformationMapper';
import { OpenFoodFactsAdapter } from './OpenFoodFactsAdapter';

@Module({
    providers: [
        {
            provide: FoodInformationMapperType,
            useClass: FoodInformationMapper,
        },
        {
            provide: FoodProviderType,
            useClass: OpenFoodFactsAdapter,
        },
    ],
    exports: [
        FoodProviderType,
    ],
})
export class OpenFoodFactsModule {
}
