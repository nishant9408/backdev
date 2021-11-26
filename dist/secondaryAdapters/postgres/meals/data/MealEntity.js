"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MealEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealEntity = void 0;
const typeorm_1 = require("typeorm");
const Diet_1 = require("../../../../core/data/Diet");
let MealEntity = MealEntity_1 = class MealEntity {
    static fromObject(builder) {
        const entity = new MealEntity_1();
        entity.id = builder.id;
        entity.name = builder.name;
        entity.calories = builder.calories;
        entity.proteins = builder.proteins;
        entity.fats = builder.fats;
        entity.carbs = builder.carbs;
        entity.ingredients = builder.ingredients;
        return entity;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], MealEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], MealEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calories' }),
    __metadata("design:type", Number)
], MealEntity.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proteins' }),
    __metadata("design:type", Number)
], MealEntity.prototype, "proteins", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fats' }),
    __metadata("design:type", Number)
], MealEntity.prototype, "fats", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'diet' }),
    __metadata("design:type", String)
], MealEntity.prototype, "diet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'carbs' }),
    __metadata("design:type", Number)
], MealEntity.prototype, "carbs", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'ingredients' }),
    __metadata("design:type", Array)
], MealEntity.prototype, "ingredients", void 0);
MealEntity = MealEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'meals' })
], MealEntity);
exports.MealEntity = MealEntity;
//# sourceMappingURL=MealEntity.js.map