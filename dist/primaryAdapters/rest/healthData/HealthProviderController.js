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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthProviderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Config_1 = require("../../../configuration/config/Config");
const HandleActivity_1 = require("../../../core/usecases/HandleActivity");
const HealthKitActivityInput_1 = require("./input/HealthKitActivityInput");
let HealthProviderController = class HealthProviderController {
    constructor(handleActivity) {
        this.handleActivity = handleActivity;
    }
    verifyEndpoint(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationCode = Config_1.default.fitbit.verificationCode;
            const code = request.query.verify === verificationCode ?
                common_1.HttpStatus.NO_CONTENT :
                common_1.HttpStatus.NOT_FOUND;
            response.status(code).send();
        });
    }
    handleActivityFromFitbit(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.body[0]['ownerId'];
            this.handleActivity.execute({ userId });
            response.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    handleActivityFromHealthKit(input) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    (0, common_1.Get)('fitbit/activity'),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Error' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HealthProviderController.prototype, "verifyEndpoint", null);
__decorate([
    (0, common_1.Post)('fitbit/activity'),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Error' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HealthProviderController.prototype, "handleActivityFromFitbit", null);
__decorate([
    (0, common_1.Post)('activity'),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HealthKitActivityInput_1.HealthKitActivityInput]),
    __metadata("design:returntype", Promise)
], HealthProviderController.prototype, "handleActivityFromHealthKit", null);
HealthProviderController = __decorate([
    (0, common_1.Controller)('health-provider'),
    __metadata("design:paramtypes", [HandleActivity_1.HandleActivity])
], HealthProviderController);
exports.HealthProviderController = HealthProviderController;
//# sourceMappingURL=HealthProviderController.js.map