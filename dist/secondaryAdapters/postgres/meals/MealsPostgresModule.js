"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsPostgresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const MealRepository_1 = require("../../../core/ports/MealRepository");
const MealEntity_1 = require("./data/MealEntity");
const MealsPostgresAdapter_1 = require("./MealsPostgresAdapter");
let MealsPostgresModule = class MealsPostgresModule {
};
MealsPostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                MealEntity_1.MealEntity,
            ])],
        providers: [
            {
                provide: MealRepository_1.MealRepositoryType,
                useClass: MealsPostgresAdapter_1.MealsPostgresAdapter,
            },
        ],
        exports: [
            MealRepository_1.MealRepositoryType,
        ],
    })
], MealsPostgresModule);
exports.MealsPostgresModule = MealsPostgresModule;
//# sourceMappingURL=MealsPostgresModule.js.map