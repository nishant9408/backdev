import { Injectable } from '@nestjs/common';
import * as OAuth2 from 'oauth2-server';
import { CoreRequest } from '../../../core/sharedKernel/http/CoreRequest';
import { Mapper } from '../../../core/sharedKernel/interfaces/Mapper';

@Injectable()
export class OAuthRequestMapper implements Mapper<CoreRequest, OAuth2.Request> {
    map(from: CoreRequest): OAuth2.Request {
        return new OAuth2.Request(from);
    }
}

const OAuthRequestMapperType = Symbol.for('OAuthRequestMapper');
export { OAuthRequestMapperType };
