import { Injectable } from '@nestjs/common';
import * as OAuth2 from 'oauth2-server';
import { CoreResponse } from '../../../core/sharedKernel/http/CoreResponse';
import { Mapper } from '../../../core/sharedKernel/interfaces/Mapper';

@Injectable()
export class OAuthResponseMapper implements Mapper<CoreResponse, OAuth2.Response> {
    map(from: CoreResponse): OAuth2.Response {
        return new OAuth2.Response(from);
    }
}

const OAuthResponseMapperType = Symbol.for('OAuthResponseMapper');
export { OAuthResponseMapperType };
