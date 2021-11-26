"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyScoreConverterType = exports.DailyScoreConverter = void 0;
const common_1 = require("@nestjs/common");
const DailyScore_1 = require("../../../../core/data/DailyScore");
const DailyScoreEntity_1 = require("../data/DailyScoreEntity");
let DailyScoreConverter = class DailyScoreConverter {
    from(from) {
        return DailyScoreEntity_1.DailyScoreEntity.fromObject(from);
    }
    to(to) {
        return DailyScore_1.DailyScore.fromObject(to);
    }
};
DailyScoreConverter = __decorate([
    (0, common_1.Injectable)()
], DailyScoreConverter);
exports.DailyScoreConverter = DailyScoreConverter;
const DailyScoreConverterType = Symbol.for('DailyScoreConverter');
exports.DailyScoreConverterType = DailyScoreConverterType;
//# sourceMappingURL=DailyScoreConverter.js.map