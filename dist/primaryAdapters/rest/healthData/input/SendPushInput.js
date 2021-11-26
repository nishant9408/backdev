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
exports.SendPushInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const NotificationType_1 = require("../../../../core/data/NotificationType");
class SendPushInput {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5, { message: 'userId is too short' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        minLength: 5,
    }),
    __metadata("design:type", String)
], SendPushInput.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(10, { message: 'notificationToken is too short' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        minLength: 10,
        example: 'token-010102013123-sd',
    }),
    __metadata("design:type", String)
], SendPushInput.prototype, "notificationToken", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(NotificationType_1.NotificationType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        enum: NotificationType_1.NotificationType,
    }),
    __metadata("design:type", String)
], SendPushInput.prototype, "notificationType", void 0);
exports.SendPushInput = SendPushInput;
//# sourceMappingURL=SendPushInput.js.map