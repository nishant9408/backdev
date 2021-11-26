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
const core_1 = require("@nestjs/core");
require("reflect-metadata");
const AppInitializer_1 = require("./AppInitializer");
const AppModule_1 = require("./AppModule");
const Config_1 = require("./configuration/config/Config");
const HttpExceptionFilter_1 = require("./configuration/HttpExceptionFilter");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(AppModule_1.AppModule);
        app.useGlobalFilters(new HttpExceptionFilter_1.AllExceptionsFilter());
        (0, AppInitializer_1.initSentry)(app);
        (0, AppInitializer_1.setupApi)(app);
        (0, AppInitializer_1.initDocs)(app);
        yield app.listen(Config_1.default.port, Config_1.default.host);
    });
}
bootstrap();
//# sourceMappingURL=server.js.map