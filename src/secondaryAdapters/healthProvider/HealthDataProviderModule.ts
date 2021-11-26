import { Module } from '@nestjs/common';
import { HealthProviderPortType } from '../../core/ports/HealthProviderPort';
import { FitbitClient } from './FitbitClient';
import { HealthDataProviderAdapter } from './HealthDataProviderAdapter';

@Module({
    providers: [
        {
            provide: HealthProviderPortType,
            useClass: HealthDataProviderAdapter,
        },
        FitbitClient,
    ],
    exports: [
        HealthProviderPortType,
    ],
})
export class HealthDataProviderModule { }
