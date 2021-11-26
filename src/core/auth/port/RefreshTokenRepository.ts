import { RefreshTokenEntity } from '../../../secondaryAdapters/postgres/auth/data/RefreshTokenEntity';

export interface RefreshTokenRepository {
    findRefreshTokenData(refreshToken: string): Promise<RefreshTokenEntity | null>;

    findRefreshTokenListByUserId(userId: number): Promise<RefreshTokenEntity[]>;

    save(refreshTokenData: RefreshTokenEntity): Promise<RefreshTokenEntity>;

    saveList(accessTokensData: RefreshTokenEntity[]): Promise<RefreshTokenEntity[]>;

}

const RefreshTokenRepositoryType = Symbol.for('RefreshTokenRepository');
export { RefreshTokenRepositoryType };
