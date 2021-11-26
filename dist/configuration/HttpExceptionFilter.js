"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const ApiResponse_1 = require("./ApiResponse");
const Logger_1 = require("./Logger");
const Sentry_1 = require("./Sentry");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(originException, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const httpException = this.parseError(originException);
        if (httpException.getStatus() >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            this.captureBySentry(originException);
        }
        Logger_1.default.error(httpException.message);
        const errors = this.exceptionToResponseErrors(httpException);
        response
            .status(httpException.getStatus())
            .json(ApiResponse_1.ApiResponse.fromObject(null, errors));
    }
    exceptionToResponseErrors(exception) {
        const exceptionData = exception.getResponse();
        const status = exception.getStatus();
        if (status >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            return this.buildMessage('Internal server error');
        }
        if (status >= common_1.HttpStatus.BAD_REQUEST && Array.isArray(exceptionData['message'])) {
            return exceptionData['message'].map(mess => ({ message: mess }));
        }
        return this.buildMessage(exceptionData['message']);
    }
    parseError(exception) {
        return exception instanceof common_1.HttpException ?
            exception :
            new common_1.InternalServerErrorException(exception.message);
    }
    buildMessage(message) {
        return [{ message }];
    }
    captureBySentry(exception) {
        if ((0, Sentry_1.isInitSentry)()) {
            Sentry_1.default.captureException(exception);
        }
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=HttpExceptionFilter.js.map