import { Injectable } from '@nestjs/common';
import { Token } from 'oauth2-server';

import { OAuth2Token } from '../../../core/auth/application/data/internal/OAuth2Token';
import { Mapper } from '../../../core/sharedKernel/interfaces/Mapper';

@Injectable()
export class TokenMapper implements Mapper<Token, OAuth2Token> {
    map(from: Token): OAuth2Token {
        return OAuth2Token.fromObject({
            ...from,
            userId: Number(from.user.id),
        });
    }
}

const TokenMapperType = Symbol.for('TokenMapper');
export { TokenMapperType };
