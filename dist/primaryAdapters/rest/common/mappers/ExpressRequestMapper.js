"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRequestMapperType = exports.ExpressRequestMapper = void 0;
const common_1 = require("@nestjs/common");
const CoreRequest_1 = require("../../../../core/sharedKernel/http/CoreRequest");
let ExpressRequestMapper = class ExpressRequestMapper {
    map(from) {
        return CoreRequest_1.CoreRequest.fromObject({
            body: from.body,
            headers: from.headers,
            method: from.method,
        });
    }
};
ExpressRequestMapper = __decorate([
    (0, common_1.Injectable)()
], ExpressRequestMapper);
exports.ExpressRequestMapper = ExpressRequestMapper;
const ExpressRequestMapperType = Symbol.for('ExpressRequestMapper');
exports.ExpressRequestMapperType = ExpressRequestMapperType;
//# sourceMappingURL=ExpressRequestMapper.js.map