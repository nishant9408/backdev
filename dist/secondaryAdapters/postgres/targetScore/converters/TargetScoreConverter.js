"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetScoreConverterType = exports.TargetScoreConverter = void 0;
const common_1 = require("@nestjs/common");
const TargetScore_1 = require("../../../../core/data/TargetScore");
const TargetScoreEntity_1 = require("../data/TargetScoreEntity");
let TargetScoreConverter = class TargetScoreConverter {
    from(from) {
        return TargetScoreEntity_1.TargetScoreEntity.fromObject(from);
    }
    to(to) {
        return TargetScore_1.TargetScore.fromObject(to);
    }
};
TargetScoreConverter = __decorate([
    (0, common_1.Injectable)()
], TargetScoreConverter);
exports.TargetScoreConverter = TargetScoreConverter;
const TargetScoreConverterType = Symbol.for('TargetScoreConverter');
exports.TargetScoreConverterType = TargetScoreConverterType;
//# sourceMappingURL=TargetScoreConverter.js.map