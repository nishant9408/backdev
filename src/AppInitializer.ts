import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createNamespace } from 'cls-hooked';
import * as basicAuth from 'express-basic-auth';
import * as ExpressPinoLogger from 'express-pino-logger';

import config from './configuration/config/Config';
import logger from './configuration/Logger';
import { ResultInterceptor } from './configuration/ResultInterceptor';
import Sentry, { isInitSentry } from './configuration/Sentry';

export function setupApi(app: INestApplication) {
    app.setGlobalPrefix('api');
    app.use(ExpressPinoLogger({ logger }));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ResultInterceptor());
}

export function initDocs(app: INestApplication) {
    const docsPath = 'docs';
    const options = new DocumentBuilder()
        .setTitle('Healthy picks')
        .setDescription('The API for Healthy picks project')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    app.use(`/${docsPath}`, basicAuth({
        users: { [config.docs.auth.user]: config.docs.auth.password },
        challenge: true,
    }));
    SwaggerModule.setup(docsPath, app, document);
}

export function initSentry(app: INestApplication) {
    if (isInitSentry()) {
        app.use(Sentry.Handlers.requestHandler());
    }
}
