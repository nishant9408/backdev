import { Inject, Injectable } from '@nestjs/common';
import * as OAuth2Server from 'oauth2-server';

import { OAuth2Token } from '../../core/auth/application/data/internal/OAuth2Token';
import { AuthTokenRetriever } from '../../core/auth/port/AuthTokenRetriever';
import { CoreRequest } from '../../core/sharedKernel/http/CoreRequest';
import { CoreResponse } from '../../core/sharedKernel/http/CoreResponse';
import { OAuthRequestMapper, OAuthRequestMapperType } from './mappers/OAuthRequestMapper';
import { OAuthResponseMapper, OAuthResponseMapperType } from './mappers/OAuthResponseMapper';
import { TokenMapper, TokenMapperType } from './mappers/TokenMapper';
import { OAuth2ServerType } from './OAuthServerModel';

@Injectable()
export class OAuthServerAdapter implements AuthTokenRetriever {

    constructor(
        @Inject(OAuth2ServerType)
        private readonly oauth: OAuth2Server,
        @Inject(OAuthRequestMapperType)
        private readonly oauthRequestMapper: OAuthRequestMapper,
        @Inject(OAuthResponseMapperType)
        private readonly oauthResponseMapper: OAuthResponseMapper,
        @Inject(TokenMapperType)
        private readonly tokenMapper: TokenMapper,
    ) { }

    public async getToken(request: CoreRequest, response: CoreResponse): Promise<OAuth2Token> {
        const token = await this.oauth.token(
            this.oauthRequestMapper.map(request),
            this.oauthResponseMapper.map(response),
        );
        return this.tokenMapper.map(token);
    }
}
