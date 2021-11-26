import { AuthClientEntity } from '../../../secondaryAdapters/postgres/auth/data/AuthClientEntity';

export interface AuthClientRepository {
    findById(clientId: string): Promise<AuthClientEntity | null>;

    findByIdAndSecret(clientId: string, clientSecret: string): Promise<AuthClientEntity | null>;

    findByAccessToken(accessToken: string): Promise<AuthClientEntity | null>;
}

const AuthClientRepositoryType = Symbol.for('AuthClientRepository');
export { AuthClientRepositoryType };
