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
exports.HealthProviderAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const HealthProvider_1 = require("../../../core/data/HealthProvider");
const HealthProviderName_1 = require("../../../core/data/HealthProviderName");
const HealthProviderEntity_1 = require("./data/HealthProviderEntity");
let HealthProviderAdapter = class HealthProviderAdapter {
    constructor(healthProviderRepository) {
        this.healthProviderRepository = healthProviderRepository;
    }
    getHealthProviderDataByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.healthProviderRepository.findOne({ uId: userId });
            return entity ? HealthProvider_1.HealthProvider.fromObject(entity) : null;
        });
    }
    saveHealthProviderData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityToSave = HealthProviderEntity_1.HealthProviderEntity.fromObject(data);
            const entity = yield this.healthProviderRepository.save(entityToSave);
            return HealthProvider_1.HealthProvider.fromObject(entity);
        });
    }
    getHealthKitProviders() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.healthProviderRepository.find({ name: HealthProviderName_1.HealthProviderName.HEALTH_KIT });
            return entities.map(entity => HealthProvider_1.HealthProvider.fromObject(entity));
        });
    }
    getFitbitProviders() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.healthProviderRepository.find({ name: HealthProviderName_1.HealthProviderName.FITBIT });
            return entities.map(entity => HealthProvider_1.HealthProvider.fromObject(entity));
        });
    }
};
HealthProviderAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(HealthProviderEntity_1.HealthProviderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HealthProviderAdapter);
exports.HealthProviderAdapter = HealthProviderAdapter;
//# sourceMappingURL=HealthProviderAdapter.js.map