"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestModule = void 0;
const common_1 = require("@nestjs/common");
const AuthModule_1 = require("../../core/auth/AuthModule");
const CoreModule_1 = require("../../core/CoreModule");
const UserModule_1 = require("../../core/user/UserModule");
const RepositoryModule_1 = require("../../secondaryAdapters/postgres/RepositoryModule");
const AuthController_1 = require("./auth/AuthController");
const AuthGuardModule_1 = require("./common/guard/AuthGuardModule");
const ExpressRequestMapper_1 = require("./common/mappers/ExpressRequestMapper");
const ExpressResponseMapper_1 = require("./common/mappers/ExpressResponseMapper");
const DailyScoreController_1 = require("./dailyScore/DailyScoreController");
const FoodAndScoreOutputMapper_1 = require("./food/mappers/FoodAndScoreOutputMapper");
const ProvideFoodAndScoreController_1 = require("./food/ProvideFoodAndScoreController");
const HealthCheckController_1 = require("./healthCheck/HealthCheckController");
const HealthProviderController_1 = require("./healthData/HealthProviderController");
const LocationController_1 = require("./location/LocationController");
const SubscriberController_1 = require("./samsungSubscriber/SubscriberController");
const TargetScoreController_1 = require("./targetScore/TargetScoreController");
const UserController_1 = require("./user/UserController");
let RestModule = class RestModule {
};
RestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            CoreModule_1.CoreModule,
            AuthModule_1.AuthModule,
            UserModule_1.UserModule,
            RepositoryModule_1.RepositoryModule,
            AuthGuardModule_1.AuthGuardModule,
        ],
        providers: [
            {
                provide: FoodAndScoreOutputMapper_1.FoodAndScoreOutputMapperType,
                useClass: FoodAndScoreOutputMapper_1.FoodAndScoreOutputMapper,
            }, {
                provide: ExpressRequestMapper_1.ExpressRequestMapperType,
                useClass: ExpressRequestMapper_1.ExpressRequestMapper,
            }, {
                provide: ExpressResponseMapper_1.ExpressResponseMapperType,
                useClass: ExpressResponseMapper_1.ExpressResponseMapper,
            },
        ],
        controllers: [
            HealthCheckController_1.HealthCheckController,
            LocationController_1.LocationController,
            ProvideFoodAndScoreController_1.ProvideFoodAndScoreController,
            DailyScoreController_1.DailyScoreController,
            HealthProviderController_1.HealthProviderController,
            DailyScoreController_1.DailyScoreController,
            SubscriberController_1.SubscriberController,
            UserController_1.UserController,
            AuthController_1.AuthController,
            TargetScoreController_1.TargetScoreController,
        ],
    })
], RestModule);
exports.RestModule = RestModule;
//# sourceMappingURL=RestModule.js.map