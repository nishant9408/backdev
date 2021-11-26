import { Module } from '@nestjs/common';
import * as OAuth2Server from 'oauth2-server';

import config from '../../configuration/config/Config';
import { AuthModelType } from '../../core/auth/port/AuthTokenRetriever';
import { UserModule } from '../../core/user/UserModule';
import { AuthPostgresModule } from '../postgres/auth/AuthPostgresModule';
import { UserPostgresModule } from '../postgres/user/UserPostgresModule';
import { OAuthRequestMapper, OAuthRequestMapperType } from './mappers/OAuthRequestMapper';
import { OAuthResponseMapper, OAuthResponseMapperType } from './mappers/OAuthResponseMapper';
import { TokenMapper, TokenMapperType } from './mappers/TokenMapper';
import { OAuthServerAdapter } from './OAuthServerAdapter';
import { OAuth2ServerType, OAuthServerModel, OAuthServerModelType } from './OAuthServerModel';

@Module({
    imports: [ AuthPostgresModule, UserPostgresModule, UserModule ],
    providers: [
        {
            provide: OAuthRequestMapperType,
            useClass: OAuthRequestMapper,
        }, {
            provide: OAuthResponseMapperType,
            useClass: OAuthResponseMapper,
        }, {
            provide: TokenMapperType,
            useClass: TokenMapper,
        }, {
            provide: OAuthServerModelType,
            useClass: OAuthServerModel,
        }, {
            provide: AuthModelType,
            useClass: OAuthServerAdapter,
        }, {
            provide: OAuth2ServerType,
            useFactory: (serverModel: OAuthServerModel) =>
                new OAuth2Server({
                    model: serverModel,
                    accessTokenLifetime: config.auth.accessTokenLifetime,
                    refreshTokenLifetime: config.auth.refreshTokenLifetime,
                }),
            inject: [ OAuthServerModelType ],
        },
    ],
    exports: [
        OAuth2ServerType,
        OAuthServerModelType,
        AuthModelType,
    ],
})
export class OAuthModule { }
