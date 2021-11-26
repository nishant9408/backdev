"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetScorePostgresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const TargetScoreRepository_1 = require("../../../core/ports/TargetScoreRepository");
const TargetScoreConverter_1 = require("./converters/TargetScoreConverter");
const TargetScoreEntity_1 = require("./data/TargetScoreEntity");
const TargetScoreRepositoryAdapter_1 = require("./TargetScoreRepositoryAdapter");
let TargetScorePostgresModule = class TargetScorePostgresModule {
};
TargetScorePostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                TargetScoreEntity_1.TargetScoreEntity,
            ])],
        providers: [
            {
                provide: TargetScoreConverter_1.TargetScoreConverterType,
                useClass: TargetScoreConverter_1.TargetScoreConverter,
            },
            {
                provide: TargetScoreRepository_1.TargetScoreRepositoryType,
                useClass: TargetScoreRepositoryAdapter_1.TargetScoreRepositoryAdapter,
            },
        ],
        exports: [
            TargetScoreRepository_1.TargetScoreRepositoryType,
        ],
    })
], TargetScorePostgresModule);
exports.TargetScorePostgresModule = TargetScorePostgresModule;
//# sourceMappingURL=TargetScorePostgresModule.js.map