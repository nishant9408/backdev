import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as OAuth2 from 'oauth2-server';
import * as R from 'ramda';

import config from '../../configuration/config/Config';
import { AuthUser } from '../../core/auth/application/data/internal/AuthUser';
import { AccessTokenRepository, AccessTokenRepositoryType } from '../../core/auth/port/AccessTokenRepository';
import { AuthClientRepository, AuthClientRepositoryType } from '../../core/auth/port/AuthClientRepository';
import { RefreshTokenRepository, RefreshTokenRepositoryType } from '../../core/auth/port/RefreshTokenRepository';
import { UserRegistrationService } from '../../core/user/application/services/UserRegistrationService';
import { UserRepository, UserRepositoryType } from '../../core/user/port/UserRepository';
import { UserResponse } from '../../primaryAdapters/rest/user/data/response/UserResponse';
import { AccessTokenEntity } from '../postgres/auth/data/AccessTokenEntity';
import { RefreshTokenEntity } from '../postgres/auth/data/RefreshTokenEntity';

@Injectable()
export class OAuthServerModel implements OAuth2.PasswordModel, OAuth2.RefreshTokenModel {
    constructor(
        @Inject(AuthClientRepositoryType)
        private readonly authClientRepository: AuthClientRepository,
        @Inject(AccessTokenRepositoryType)
        private readonly accessTokenRepository: AccessTokenRepository,
        @Inject(RefreshTokenRepositoryType)
        private readonly refreshTokenRepository: RefreshTokenRepository,
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        private readonly userRegService: UserRegistrationService,
    ) {
    }

    public async getAccessToken(accessToken: string): Promise<OAuth2.Token | OAuth2.Falsey> {
        const accessTokenData = await this.accessTokenRepository.findAccessTokenData(accessToken);

        if (!accessTokenData || !accessTokenData.isActive) {
            return null;
        }

        return {
            accessToken: accessTokenData.accessToken,
            accessTokenExpiresAt: accessTokenData.expires,
            scope: accessTokenData.scope,
            client: {
                id: accessTokenData.clientId,
                grants: [],
            },
            user: {
                id: accessTokenData.userId,
            },
        };
    }

    public async saveToken(
        oauth2Token: OAuth2.Token,
        oauthClient: OAuth2.Client,
        oauthUser: OAuth2.User,
    ): Promise<OAuth2.Token | OAuth2.Falsey> {
        await Promise.all([
            this.saveAccessTokenData(oauth2Token, oauthClient, oauthUser),
            this.saveRefreshTokenData(oauth2Token, oauthClient, oauthUser),
        ]);

        return {
            ...oauth2Token,
            client: oauthClient,
            user: oauthUser,
        };
    }

    public async getRefreshToken(refreshToken: string): Promise<OAuth2.RefreshToken | OAuth2.Falsey> {
        const refreshTokenData = await this.refreshTokenRepository.findRefreshTokenData(refreshToken);

        if (!refreshTokenData) {
            return null;
        }

        return {
            refreshToken: refreshTokenData.refreshToken,
            refreshTokenExpiresAt: refreshTokenData.expires,
            scope: refreshTokenData.scope,
            client: {
                id: refreshTokenData.clientId,
                grants: [],
            },
            user: {
                id: refreshTokenData.userId,
            },
        };
    }

    public async getUserByEmail(email: string): Promise<OAuth2.User | null> {
        return await this.userRepository.findByEmail(email);
    }

    public async createUser(userData: AuthUser): Promise<OAuth2.User> {
        // return await this.userRegService.registration(userData);
        return new UserResponse();
    }

    public async getUser(email: string, password: string): Promise<OAuth2.User | OAuth2.Falsey> {
        const userData = await this.userRepository.findByEmail(email);
        if (!userData || !userData.password) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordCorrect = await argon2.verify(userData.password, password);
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return {
            id: userData.id,
        };
    }

    public async getClient(clientId: string, clientSecret: string): Promise<OAuth2.Client | OAuth2.Falsey> {
        const client = await this.authClientRepository.findByIdAndSecret(clientId, clientSecret);

        if (!client) {
            return null;
        }

        return {
            id: client.clientId,
            grants: client.grantTypes,
            scope: client.scope,
        };
    }

    public async validateScope(user: OAuth2.User, client: OAuth2.Client, scope: string): Promise<string | string[] | OAuth2.Falsey> {
        const parsedScope = scope.split(',');
        if (!parsedScope.every((scp) => client.scope.includes(scp))) {
            return null;
        }

        return parsedScope;
    }

    public async verifyScope(token: OAuth2.Token, scope: string | string[]): Promise<boolean> {
        return R.equals(token.scope, scope);
    }

    public async revokeToken(refreshTokenData: OAuth2.RefreshToken): Promise<boolean> {
        const { refreshToken } = refreshTokenData;

        const refreshTokenToUpdate = await this.refreshTokenRepository.findRefreshTokenData(refreshToken);
        const accessTokenToUpdate = await this.accessTokenRepository.findAccessTokenByRefreshToken(refreshToken);

        if (!refreshTokenToUpdate || !accessTokenToUpdate) {
            return false;
        }

        accessTokenToUpdate.isActive = false;
        refreshTokenToUpdate.isActive = false;

        await Promise.all([ this.accessTokenRepository.save(accessTokenToUpdate), this.refreshTokenRepository.save(refreshTokenToUpdate) ]);

        return true;
    }

    private async saveAccessTokenData(
        oauthToken: OAuth2.Token,
        oauthClient: OAuth2.Client,
        oauthUser: OAuth2.User,
    ): Promise<AccessTokenEntity> {
        const accessTokenToSave = AccessTokenEntity.fromObject({
            accessToken: oauthToken.accessToken,
            refreshToken: oauthToken.refreshToken as string,
            expires: oauthToken.accessTokenExpiresAt || new Date(Date.now() + config.auth.accessTokenLifetime * 1000),
            clientId: oauthClient.id,
            scope: oauthToken.scope as string[],
            userId: oauthUser.id,
        });

        return await this.accessTokenRepository.save(accessTokenToSave);
    }

    private async saveRefreshTokenData(
        oauthToken: OAuth2.Token,
        oauthClient: OAuth2.Client,
        oauthUser: OAuth2.User,
    ): Promise<RefreshTokenEntity | boolean> {
        if (!oauthToken.refreshToken) {
            return false;
        }

        const refreshTokenToSave = RefreshTokenEntity.fromObject({
            refreshToken: oauthToken.refreshToken,
            expires: oauthToken.refreshTokenExpiresAt || new Date(Date.now() + config.auth.refreshTokenLifetime * 1000),
            clientId: oauthClient.id,
            scope: oauthToken.scope as string[],
            userId: oauthUser.id,
        });

        return await this.refreshTokenRepository.save(refreshTokenToSave);
    }
}

const OAuthServerModelType = Symbol.for('OAuthServerModel');
export { OAuthServerModelType };

const OAuth2ServerType = Symbol.for('OAuth2Server');
export { OAuth2ServerType };
