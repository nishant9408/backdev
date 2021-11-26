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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthKitActivityInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ActivityInput_1 = require("./ActivityInput");
const HealthDataInput_1 = require("./HealthDataInput");
class HealthKitActivityInput {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5, { message: 'userId is too short' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        minLength: 5,
    }),
    __metadata("design:type", String)
], HealthKitActivityInput.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ActivityInput_1.ActivityInput),
    (0, swagger_1.ApiProperty)({ type: ActivityInput_1.ActivityInput }),
    __metadata("design:type", ActivityInput_1.ActivityInput)
], HealthKitActivityInput.prototype, "activity", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => HealthDataInput_1.HealthDataInput),
    (0, swagger_1.ApiProperty)({ type: HealthDataInput_1.HealthDataInput }),
    __metadata("design:type", HealthDataInput_1.HealthDataInput)
], HealthKitActivityInput.prototype, "healthData", void 0);
exports.HealthKitActivityInput = HealthKitActivityInput;
//# sourceMappingURL=HealthKitActivityInput.js.map