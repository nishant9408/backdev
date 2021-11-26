"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("../../core/ports/Repository");
const FoodAndScoreOutputMapper_1 = require("../../primaryAdapters/rest/food/mappers/FoodAndScoreOutputMapper");
const applyMixins_1 = require("./applyMixins");
const DailyScoreConverter_1 = require("./dailyScore/converters/DailyScoreConverter");
const DailyScoreAdapter_1 = require("./dailyScore/DailyScoreAdapter");
const DailyScoreEntity_1 = require("./dailyScore/data/DailyScoreEntity");
const HealthProviderEntity_1 = require("./health/data/HealthProviderEntity");
const HealthProviderAdapter_1 = require("./health/HealthProviderAdapter");
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                DailyScoreEntity_1.DailyScoreEntity,
                HealthProviderEntity_1.HealthProviderEntity,
            ]),
        ],
        providers: [
            {
                provide: DailyScoreConverter_1.DailyScoreConverterType,
                useClass: DailyScoreConverter_1.DailyScoreConverter,
            },
            {
                provide: FoodAndScoreOutputMapper_1.FoodAndScoreOutputMapperType,
                useClass: FoodAndScoreOutputMapper_1.FoodAndScoreOutputMapper,
            },
            DailyScoreAdapter_1.DailyScoreAdapter,
            HealthProviderAdapter_1.HealthProviderAdapter,
            {
                provide: Repository_1.RepositoryType,
                useFactory: (...adapters) => (0, applyMixins_1.applyMixins)(adapters),
                inject: [
                    DailyScoreAdapter_1.DailyScoreAdapter,
                    HealthProviderAdapter_1.HealthProviderAdapter,
                ],
            },
        ],
        exports: [
            Repository_1.RepositoryType,
        ],
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=RepositoryModule.js.map