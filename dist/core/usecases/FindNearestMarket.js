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
exports.FindNearestMarket = void 0;
const common_1 = require("@nestjs/common");
const Logger_1 = require("../../configuration/Logger");
const Point_1 = require("../data/Point");
const MapProvider_1 = require("../ports/MapProvider");
const Repository_1 = require("../ports/Repository");
let FindNearestMarket = class FindNearestMarket {
    constructor(repositoryAdapter, mapProviderAdapter) {
        this.repositoryAdapter = repositoryAdapter;
        this.mapProviderAdapter = mapProviderAdapter;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request;
            const location = yield this.repositoryAdapter.findLocation(userId);
            if (!location) {
                Logger_1.default.info({ userId }, 'No device location');
                return null;
            }
            return yield this.mapProviderAdapter.findNearest(Point_1.Point.fromObject(location));
        });
    }
};
FindNearestMarket = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(1, (0, common_1.Inject)(MapProvider_1.MapProviderType)),
    __metadata("design:paramtypes", [Object, Object])
], FindNearestMarket);
exports.FindNearestMarket = FindNearestMarket;
//# sourceMappingURL=FindNearestMarket.js.map