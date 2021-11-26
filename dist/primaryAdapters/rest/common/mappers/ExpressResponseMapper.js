"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressResponseMapperType = exports.ExpressResponseMapper = void 0;
const common_1 = require("@nestjs/common");
const CoreResponse_1 = require("../../../../core/sharedKernel/http/CoreResponse");
let ExpressResponseMapper = class ExpressResponseMapper {
    map(from) {
        return CoreResponse_1.CoreResponse.fromObject({
            headers: Object.assign({}, from.getHeaders()),
        });
    }
};
ExpressResponseMapper = __decorate([
    (0, common_1.Injectable)()
], ExpressResponseMapper);
exports.ExpressResponseMapper = ExpressResponseMapper;
const ExpressResponseMapperType = Symbol.for('ExpressResponseMapper');
exports.ExpressResponseMapperType = ExpressResponseMapperType;
//# sourceMappingURL=ExpressResponseMapper.js.map