import { Module } from '@nestjs/common';
import { AuthModule } from '../../core/auth/AuthModule';
import { CoreModule } from '../../core/CoreModule';
import { UserModule } from '../../core/user/UserModule';
import { RepositoryModule } from '../../secondaryAdapters/postgres/RepositoryModule';
import { AuthController } from './auth/AuthController';
import { AuthGuardModule } from './common/guard/AuthGuardModule';
import { ExpressRequestMapper, ExpressRequestMapperType } from './common/mappers/ExpressRequestMapper';
import { ExpressResponseMapper, ExpressResponseMapperType } from './common/mappers/ExpressResponseMapper';
import { DailyScoreController } from './dailyScore/DailyScoreController';
import { FoodAndScoreOutputMapper, FoodAndScoreOutputMapperType } from './food/mappers/FoodAndScoreOutputMapper';
import { ProvideFoodAndScoreController } from './food/ProvideFoodAndScoreController';
import { HealthCheckController } from './healthCheck/HealthCheckController';
import { HealthProviderController } from './healthData/HealthProviderController';
import { LocationController } from './location/LocationController';
import { SubscriberController } from './samsungSubscriber/SubscriberController';
import { TargetScoreController } from './targetScore/TargetScoreController';
import { UserController } from './user/UserController';

@Module({
    imports: [
        CoreModule,
        AuthModule,
        UserModule,
        RepositoryModule,
        AuthGuardModule,
    ],
    providers: [
        {
          provide: FoodAndScoreOutputMapperType,
          useClass: FoodAndScoreOutputMapper,
        }, {
            provide: ExpressRequestMapperType,
            useClass: ExpressRequestMapper,
        }, {
            provide: ExpressResponseMapperType,
            useClass: ExpressResponseMapper,
        },
    ],
    controllers: [
        HealthCheckController,
        LocationController,
        ProvideFoodAndScoreController,
        DailyScoreController,
        HealthProviderController,
        DailyScoreController,
        SubscriberController,
        UserController,
        AuthController,
        TargetScoreController,
    ],
})
export class RestModule { }
