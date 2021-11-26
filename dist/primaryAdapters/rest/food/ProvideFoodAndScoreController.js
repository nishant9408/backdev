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
exports.ProvideFoodAndScoreController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const AuthUser_1 = require("../../../core/auth/application/data/internal/AuthUser");
const CurrentUser_1 = require("../../../core/auth/decorators/CurrentUser");
const ProvideFoodInfoAndScore_1 = require("../../../core/usecases/ProvideFoodInfoAndScore");
const AuthGuard_1 = require("../common/guard/AuthGuard");
const FoodAndScoreInput_1 = require("./data/FoodAndScoreInput");
const FoodAndScoreOutput_1 = require("./data/FoodAndScoreOutput");
const FoodAndScoreOutputMapper_1 = require("./mappers/FoodAndScoreOutputMapper");
let ProvideFoodAndScoreController = class ProvideFoodAndScoreController {
    constructor(responseMapper, provideFoodAndScoreUseCase) {
        this.responseMapper = responseMapper;
        this.provideFoodAndScoreUseCase = provideFoodAndScoreUseCase;
    }
    provideFoodAndScore(input, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.provideFoodAndScoreUseCase.execute(Object.assign(Object.assign({}, input), { userId: authUser.userId }));
            return this.responseMapper.map(data);
        });
    }
};
__decorate([
    (0, common_1.Get)('score'),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, swagger_1.ApiOkResponse)({ type: FoodAndScoreOutput_1.FoodAndScoreOutput }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal error' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not found' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, CurrentUser_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FoodAndScoreInput_1.FoodAndScoreInput,
        AuthUser_1.AuthUser]),
    __metadata("design:returntype", Promise)
], ProvideFoodAndScoreController.prototype, "provideFoodAndScore", null);
ProvideFoodAndScoreController = __decorate([
    (0, common_1.Controller)('food'),
    __param(0, (0, common_1.Inject)(FoodAndScoreOutputMapper_1.FoodAndScoreOutputMapperType)),
    __metadata("design:paramtypes", [Object, ProvideFoodInfoAndScore_1.ProvideFoodInfoAndScore])
], ProvideFoodAndScoreController);
exports.ProvideFoodAndScoreController = ProvideFoodAndScoreController;
//# sourceMappingURL=ProvideFoodAndScoreController.js.map