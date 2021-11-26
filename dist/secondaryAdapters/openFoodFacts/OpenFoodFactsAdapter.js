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
exports.OpenFoodFactsAdapter = void 0;
const common_1 = require("@nestjs/common");
const https = require("https");
const FoodFacts_1 = require("./data/FoodFacts");
const FoodInformationMapper_1 = require("./mappers/FoodInformationMapper");
let OpenFoodFactsAdapter = class OpenFoodFactsAdapter {
    constructor(foodInformationMapper) {
        this.foodInformationMapper = foodInformationMapper;
    }
    getInfo(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
            const foodInformation = yield new Promise((resolve, reject) => {
                https.get(link, (resp) => {
                    let data = '';
                    resp.on('data', chunk => data += chunk);
                    resp.on('end', () => {
                        const parsedData = JSON.parse(data);
                        return parsedData['status'] ? resolve(FoodFacts_1.FoodFacts.fromObject(parsedData)) : resolve(null);
                    });
                }).on('error', err => reject('Error: ' + err.message));
            });
            return foodInformation ? this.foodInformationMapper.map(foodInformation) : null;
        });
    }
};
OpenFoodFactsAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(FoodInformationMapper_1.FoodInformationMapperType)),
    __metadata("design:paramtypes", [FoodInformationMapper_1.FoodInformationMapper])
], OpenFoodFactsAdapter);
exports.OpenFoodFactsAdapter = OpenFoodFactsAdapter;
//# sourceMappingURL=OpenFoodFactsAdapter.js.map