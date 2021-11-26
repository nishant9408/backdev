"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSentry = exports.initDocs = exports.setupApi = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const basicAuth = require("express-basic-auth");
const ExpressPinoLogger = require("express-pino-logger");
const Config_1 = require("./configuration/config/Config");
const Logger_1 = require("./configuration/Logger");
const ResultInterceptor_1 = require("./configuration/ResultInterceptor");
const Sentry_1 = require("./configuration/Sentry");
function setupApi(app) {
    app.setGlobalPrefix('api');
    app.use(ExpressPinoLogger({ logger: Logger_1.default }));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ResultInterceptor_1.ResultInterceptor());
}
exports.setupApi = setupApi;
function initDocs(app) {
    const docsPath = 'docs';
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Healthy picks')
        .setDescription('The API for Healthy picks project')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    app.use(`/${docsPath}`, basicAuth({
        users: { [Config_1.default.docs.auth.user]: Config_1.default.docs.auth.password },
        challenge: true,
    }));
    swagger_1.SwaggerModule.setup(docsPath, app, document);
}
exports.initDocs = initDocs;
function initSentry(app) {
    if ((0, Sentry_1.isInitSentry)()) {
        app.use(Sentry_1.default.Handlers.requestHandler());
    }
}
exports.initSentry = initSentry;
//# sourceMappingURL=AppInitializer.js.map