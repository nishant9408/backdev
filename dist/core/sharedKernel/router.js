"use strict";
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
exports.validateOrThrow = exports.sendResponse = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function sendResponse(result, response) {
    return response.status(common_1.HttpStatus.OK).send({
        data: result,
        errors: [],
    });
}
exports.sendResponse = sendResponse;
function validateOrThrow(cls, request) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationErrors = yield (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(cls, request.body));
        if (validationErrors.length > 0) {
            throw new common_1.BadRequestException(validationErrors);
        }
    });
}
exports.validateOrThrow = validateOrThrow;
//# sourceMappingURL=router.js.map