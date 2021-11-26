import { Module } from '@nestjs/common';
import { FirebaseMessagingModule } from '../secondaryAdapters/firebaseMessaging/FirebaseMessagingModule';
import { HealthDataProviderModule } from '../secondaryAdapters/healthProvider/HealthDataProviderModule';
import { MapBoxModule } from '../secondaryAdapters/mapBox/MapBoxModule';
import { OpenFoodFactsModule } from '../secondaryAdapters/openFoodFacts/OpenFoodFactsModule';
import { MealsPostgresModule } from '../secondaryAdapters/postgres/meals/MealsPostgresModule';
import { RepositoryModule } from '../secondaryAdapters/postgres/RepositoryModule';
import { TargetScorePostgresModule } from '../secondaryAdapters/postgres/targetScore/TargetScorePostgresModule';
import { UserPostgresModule } from '../secondaryAdapters/postgres/user/UserPostgresModule';
import { FindNearestMarket } from './usecases/FindNearestMarket';
import { GenerateDailyScore } from './usecases/GenerateDailyScore';
import { GenerateTargetScore } from './usecases/GenerateTargetScore';
import { HandleActivity } from './usecases/HandleActivity';
import { InitDailyPushes } from './usecases/InitDailyPushes';
import { ProvideDailyScore } from './usecases/ProvideDailyScore';
import { ProvideFoodInfoAndScore } from './usecases/ProvideFoodInfoAndScore';
import { ProvideHealthDataFromProvider } from './usecases/ProvideHealthDataFromProvider';
import { ProvideRecommendation } from './usecases/ProvideRecommendation';
import { ProvideRecommendationAfterWorkout } from './usecases/ProvideRecommendationAfterWorkout';
import { ProvideTargetScore } from './usecases/ProvideTargetScore';
import { SaveDeviceInformation } from './usecases/SaveDeviceInformation';
import { SaveHealthData } from './usecases/SaveHealthData';
import { SaveLocation } from './usecases/SaveLocation';
import { SaveSamsungSubscriber } from './usecases/SaveSamsungSubscriber';
import { SaveTimezone } from './usecases/SaveTimezone';
import { ScheduleDailyScorePushes } from './usecases/ScheduleDailyScorePushes';
import { ScheduleFitbitPulling } from './usecases/ScheduleFitbitPulling';
import { ScheduleSilentDailyPushes } from './usecases/ScheduleSilentDailyPushes';
import { ScheduleTargetScorePushes } from './usecases/ScheduleTargetScorePushes';
import { SendDailyScorePush } from './usecases/SendDailyScorePush';
import { SendDailySilencePush } from './usecases/SendDailySilencePush';
import { SendPush } from './usecases/SendPush';
import { SendTargetScorePush } from './usecases/SendTargetScorePush';
import { UpdateProviderInformation } from './usecases/UpdateProviderInformation';

@Module({
    imports: [
        UserPostgresModule,
        MealsPostgresModule,
        RepositoryModule,
        OpenFoodFactsModule,
        HealthDataProviderModule,
        MapBoxModule,
        FirebaseMessagingModule,
        TargetScorePostgresModule,
    ],
    providers: [
        SaveLocation,
        SaveDeviceInformation,
        ProvideFoodInfoAndScore,
        SaveHealthData,
        ProvideHealthDataFromProvider,
        HandleActivity,
        InitDailyPushes,
        SendTargetScorePush,
        SendDailySilencePush,
        FindNearestMarket,
        SaveTimezone,
        ProvideRecommendation,
        ScheduleTargetScorePushes,
        ProvideRecommendationAfterWorkout,
        UpdateProviderInformation,
        GenerateDailyScore,
        ScheduleDailyScorePushes,
        SendPush,
        ProvideDailyScore,
        ScheduleSilentDailyPushes,
        SaveSamsungSubscriber,
        SendDailyScorePush,
        ProvideTargetScore,
        GenerateTargetScore,
        ScheduleFitbitPulling,
    ],
    exports: [
        SaveLocation,
        SaveDeviceInformation,
        ProvideFoodInfoAndScore,
        ScheduleDailyScorePushes,
        HandleActivity,
        InitDailyPushes,
        SendDailySilencePush,
        SaveHealthData,
        SaveTimezone,
        GenerateDailyScore,
        SendPush,
        ProvideDailyScore,
        ScheduleSilentDailyPushes,
        SaveSamsungSubscriber,
        SendDailyScorePush,
        SendTargetScorePush,
        ProvideTargetScore,
        GenerateTargetScore,
        ScheduleTargetScorePushes,
        ScheduleFitbitPulling,
    ],
})
export class CoreModule { }
