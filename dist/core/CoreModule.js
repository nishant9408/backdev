"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const FirebaseMessagingModule_1 = require("../secondaryAdapters/firebaseMessaging/FirebaseMessagingModule");
const HealthDataProviderModule_1 = require("../secondaryAdapters/healthProvider/HealthDataProviderModule");
const MapBoxModule_1 = require("../secondaryAdapters/mapBox/MapBoxModule");
const OpenFoodFactsModule_1 = require("../secondaryAdapters/openFoodFacts/OpenFoodFactsModule");
const MealsPostgresModule_1 = require("../secondaryAdapters/postgres/meals/MealsPostgresModule");
const RepositoryModule_1 = require("../secondaryAdapters/postgres/RepositoryModule");
const TargetScorePostgresModule_1 = require("../secondaryAdapters/postgres/targetScore/TargetScorePostgresModule");
const UserPostgresModule_1 = require("../secondaryAdapters/postgres/user/UserPostgresModule");
const FindNearestMarket_1 = require("./usecases/FindNearestMarket");
const GenerateDailyScore_1 = require("./usecases/GenerateDailyScore");
const GenerateTargetScore_1 = require("./usecases/GenerateTargetScore");
const HandleActivity_1 = require("./usecases/HandleActivity");
const InitDailyPushes_1 = require("./usecases/InitDailyPushes");
const ProvideDailyScore_1 = require("./usecases/ProvideDailyScore");
const ProvideFoodInfoAndScore_1 = require("./usecases/ProvideFoodInfoAndScore");
const ProvideHealthDataFromProvider_1 = require("./usecases/ProvideHealthDataFromProvider");
const ProvideRecommendation_1 = require("./usecases/ProvideRecommendation");
const ProvideRecommendationAfterWorkout_1 = require("./usecases/ProvideRecommendationAfterWorkout");
const ProvideTargetScore_1 = require("./usecases/ProvideTargetScore");
const SaveDeviceInformation_1 = require("./usecases/SaveDeviceInformation");
const SaveHealthData_1 = require("./usecases/SaveHealthData");
const SaveLocation_1 = require("./usecases/SaveLocation");
const SaveSamsungSubscriber_1 = require("./usecases/SaveSamsungSubscriber");
const SaveTimezone_1 = require("./usecases/SaveTimezone");
const ScheduleDailyScorePushes_1 = require("./usecases/ScheduleDailyScorePushes");
const ScheduleFitbitPulling_1 = require("./usecases/ScheduleFitbitPulling");
const ScheduleSilentDailyPushes_1 = require("./usecases/ScheduleSilentDailyPushes");
const ScheduleTargetScorePushes_1 = require("./usecases/ScheduleTargetScorePushes");
const SendDailyScorePush_1 = require("./usecases/SendDailyScorePush");
const SendDailySilencePush_1 = require("./usecases/SendDailySilencePush");
const SendPush_1 = require("./usecases/SendPush");
const SendTargetScorePush_1 = require("./usecases/SendTargetScorePush");
const UpdateProviderInformation_1 = require("./usecases/UpdateProviderInformation");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            UserPostgresModule_1.UserPostgresModule,
            MealsPostgresModule_1.MealsPostgresModule,
            RepositoryModule_1.RepositoryModule,
            OpenFoodFactsModule_1.OpenFoodFactsModule,
            HealthDataProviderModule_1.HealthDataProviderModule,
            MapBoxModule_1.MapBoxModule,
            FirebaseMessagingModule_1.FirebaseMessagingModule,
            TargetScorePostgresModule_1.TargetScorePostgresModule,
        ],
        providers: [
            SaveLocation_1.SaveLocation,
            SaveDeviceInformation_1.SaveDeviceInformation,
            ProvideFoodInfoAndScore_1.ProvideFoodInfoAndScore,
            SaveHealthData_1.SaveHealthData,
            ProvideHealthDataFromProvider_1.ProvideHealthDataFromProvider,
            HandleActivity_1.HandleActivity,
            InitDailyPushes_1.InitDailyPushes,
            SendTargetScorePush_1.SendTargetScorePush,
            SendDailySilencePush_1.SendDailySilencePush,
            FindNearestMarket_1.FindNearestMarket,
            SaveTimezone_1.SaveTimezone,
            ProvideRecommendation_1.ProvideRecommendation,
            ScheduleTargetScorePushes_1.ScheduleTargetScorePushes,
            ProvideRecommendationAfterWorkout_1.ProvideRecommendationAfterWorkout,
            UpdateProviderInformation_1.UpdateProviderInformation,
            GenerateDailyScore_1.GenerateDailyScore,
            ScheduleDailyScorePushes_1.ScheduleDailyScorePushes,
            SendPush_1.SendPush,
            ProvideDailyScore_1.ProvideDailyScore,
            ScheduleSilentDailyPushes_1.ScheduleSilentDailyPushes,
            SaveSamsungSubscriber_1.SaveSamsungSubscriber,
            SendDailyScorePush_1.SendDailyScorePush,
            ProvideTargetScore_1.ProvideTargetScore,
            GenerateTargetScore_1.GenerateTargetScore,
            ScheduleFitbitPulling_1.ScheduleFitbitPulling,
        ],
        exports: [
            SaveLocation_1.SaveLocation,
            SaveDeviceInformation_1.SaveDeviceInformation,
            ProvideFoodInfoAndScore_1.ProvideFoodInfoAndScore,
            ScheduleDailyScorePushes_1.ScheduleDailyScorePushes,
            HandleActivity_1.HandleActivity,
            InitDailyPushes_1.InitDailyPushes,
            SendDailySilencePush_1.SendDailySilencePush,
            SaveHealthData_1.SaveHealthData,
            SaveTimezone_1.SaveTimezone,
            GenerateDailyScore_1.GenerateDailyScore,
            SendPush_1.SendPush,
            ProvideDailyScore_1.ProvideDailyScore,
            ScheduleSilentDailyPushes_1.ScheduleSilentDailyPushes,
            SaveSamsungSubscriber_1.SaveSamsungSubscriber,
            SendDailyScorePush_1.SendDailyScorePush,
            SendTargetScorePush_1.SendTargetScorePush,
            ProvideTargetScore_1.ProvideTargetScore,
            GenerateTargetScore_1.GenerateTargetScore,
            ScheduleTargetScorePushes_1.ScheduleTargetScorePushes,
            ScheduleFitbitPulling_1.ScheduleFitbitPulling,
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=CoreModule.js.map