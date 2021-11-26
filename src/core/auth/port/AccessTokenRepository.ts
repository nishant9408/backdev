import { AccessTokenEntity } from '../../../secondaryAdapters/postgres/auth/data/AccessTokenEntity';

export interface AccessTokenRepository {
    findAccessTokenData(accessToken: string): Promise<AccessTokenEntity | null>;

    findAccessTokenListByUserId(userId: number): Promise<AccessTokenEntity[]>;

    findAccessTokenByRefreshToken(refreshToken: string): Promise<AccessTokenEntity | null>;

    save(accessTokenData: AccessTokenEntity): Promise<AccessTokenEntity>;

    saveList(accessTokensData: AccessTokenEntity[]): Promise<AccessTokenEntity[]>;
}

const AccessTokenRepositoryType = Symbol.for('AccessTokenRepository');
export { AccessTokenRepositoryType };
