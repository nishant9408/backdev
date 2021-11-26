import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import {
    initDocs, initSentry,
    setupApi,
} from './AppInitializer';
import { AppModule } from './AppModule';
import config from './configuration/config/Config';
import { AllExceptionsFilter } from './configuration/HttpExceptionFilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    initSentry(app);
    setupApi(app);
    initDocs(app);
    await app.listen(config.port, config.host);
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
