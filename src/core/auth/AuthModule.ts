import { Module } from '@nestjs/common';

import { ExpressRequestMapper, ExpressRequestMapperType } from '../../primaryAdapters/rest/common/mappers/ExpressRequestMapper';
import { ExpressResponseMapper, ExpressResponseMapperType } from '../../primaryAdapters/rest/common/mappers/ExpressResponseMapper';
import { MailerModule } from '../../secondaryAdapters/mailer/MailerModule';
import { OAuthModule } from '../../secondaryAdapters/oauth/OAuthModule';
import { AuthPostgresModule } from '../../secondaryAdapters/postgres/auth/AuthPostgresModule';
import { UserPostgresModule } from '../../secondaryAdapters/postgres/user/UserPostgresModule';
import { UserModule } from '../user/UserModule';
import { AuthService } from './application/services/AuthService';

@Module({
    imports: [
        AuthPostgresModule,
        UserPostgresModule,
        UserModule,
        OAuthModule,
        MailerModule,
    ],
    providers: [
        {
            provide: ExpressRequestMapperType,
            useClass: ExpressRequestMapper,
        }, {
            provide: ExpressResponseMapperType,
            useClass: ExpressResponseMapper,
        },
        AuthService,
    ],
    exports: [
        AuthService,
    ],
})

export class AuthModule { }
