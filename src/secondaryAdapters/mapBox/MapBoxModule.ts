import { Module } from '@nestjs/common';
import { MapProviderType } from '../../core/ports/MapProvider';
import { MapBoxAdapter } from './MapBoxAdapter';

@Module({
    providers: [
        {
            provide: MapProviderType,
            useClass: MapBoxAdapter,
        },
    ],
    exports: [
        MapProviderType,
    ],
})
export class MapBoxModule { }
