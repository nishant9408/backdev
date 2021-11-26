import { CoreRequest } from '../../sharedKernel/http/CoreRequest';
import { CoreResponse } from '../../sharedKernel/http/CoreResponse';
import { OAuth2Token } from '../application/data/internal/OAuth2Token';

export interface AuthTokenRetriever {
    getToken(request: CoreRequest, response: CoreResponse): Promise<OAuth2Token>;
}

const AuthModelType = Symbol.for('AuthTokenRetriever');
export { AuthModelType };
