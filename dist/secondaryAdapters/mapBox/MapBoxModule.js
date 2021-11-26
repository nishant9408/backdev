"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapBoxModule = void 0;
const common_1 = require("@nestjs/common");
const MapProvider_1 = require("../../core/ports/MapProvider");
const MapBoxAdapter_1 = require("./MapBoxAdapter");
let MapBoxModule = class MapBoxModule {
};
MapBoxModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: MapProvider_1.MapProviderType,
                useClass: MapBoxAdapter_1.MapBoxAdapter,
            },
        ],
        exports: [
            MapProvider_1.MapProviderType,
        ],
    })
], MapBoxModule);
exports.MapBoxModule = MapBoxModule;
//# sourceMappingURL=MapBoxModule.js.map