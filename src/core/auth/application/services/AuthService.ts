import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import logger from '../../../../configuration/Logger';

import { AuthTokenResponse } from '../../../../primaryAdapters/rest/auth/data/response/AuthTokenResponse';
import { UserResponse } from '../../../../primaryAdapters/rest/user/data/response/UserResponse';
import { MailerProvider, MailerProviderType } from '../../../ports/MailerProvider';
import { CoreRequest } from '../../../sharedKernel/http/CoreRequest';
import { CoreResponse } from '../../../sharedKernel/http/CoreResponse';
import { UserRegistrationService } from '../../../user/application/services/UserRegistrationService';
import { User } from '../../../user/domain/data/User';
import { UserRepository, UserRepositoryType } from '../../../user/port/UserRepository';
import { AccessTokenRepository, AccessTokenRepositoryType } from '../../port/AccessTokenRepository';
import { AuthModelType, AuthTokenRetriever } from '../../port/AuthTokenRetriever';
import { RefreshTokenRepository, RefreshTokenRepositoryType } from '../../port/RefreshTokenRepository';
import { AuthUser } from '../data/internal/AuthUser';
import { OAuth2Token } from '../data/internal/OAuth2Token';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AccessTokenRepositoryType)
        private readonly accessTokenRepository: AccessTokenRepository,
        @Inject(RefreshTokenRepositoryType)
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly userRegistrationService: UserRegistrationService,
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(MailerProviderType)
        private readonly mailerProvider: MailerProvider,
        @Inject(AuthModelType)
        private readonly oauth: AuthTokenRetriever,
    ) { }

    public async registration(request: CoreRequest, response: CoreResponse): Promise<UserResponse> {
        const userData = request.body;
        return await this.userRegistrationService.registration(userData);
    }

    public async login(request: CoreRequest, response: CoreResponse): Promise<AuthTokenResponse> {
        const token = await this.getTokenFromRequest(request, response);

        logger.info(`User [id: ${ token.userId }] logged in`);

        return AuthTokenResponse.fromObject({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken as string,
        });
    }

    public async refreshLogin(request: CoreRequest, response: CoreResponse): Promise<AuthTokenResponse> {
        const token = await this.getTokenFromRequest(request, response);

        logger.info(`User [id: ${ token.userId }] refreshed token`);

        return AuthTokenResponse.fromObject({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken as string,
        });
    }

    public async logout(accessToken: string): Promise<boolean> {
        const accessTokenToUpdate = await this.accessTokenRepository.findAccessTokenData(accessToken);
        if (!accessTokenToUpdate) {
            throw new UnauthorizedException('Invalid token');
        }

        const refreshTokenToUpdate = await this.refreshTokenRepository.findRefreshTokenData(accessTokenToUpdate.refreshToken);
        if (!refreshTokenToUpdate) {
            throw new UnauthorizedException('Invalid token');
        }

        const updatedAccessToken = this.disableToken(accessTokenToUpdate);
        const updatedRefreshToken = this.disableToken(refreshTokenToUpdate);
        await Promise.all([
            this.accessTokenRepository.save(updatedAccessToken),
            this.refreshTokenRepository.save(updatedRefreshToken),
        ]);

        return true;
    }

    public async getAuthUser(accessToken: string): Promise<AuthUser> {
        const accessTokenData = await this.accessTokenRepository.findAccessTokenData(accessToken);
        if (!accessTokenData || !accessTokenData.isActive) {
            throw new UnauthorizedException('Invalid token');
        }

        if (this.isTokenExpired(accessTokenData.expires)) {
            throw new UnauthorizedException('Token is expired');
        }

        return AuthUser.fromObject({
            userId: accessTokenData.userId,
            accessToken: accessTokenData.accessToken,
        });
    }
    public async resetPassword(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const newPass = this.generateRandom(3);
        const textForEmail = this.getTextForResetPassword(user.name, newPass);

        await Promise.all([
            this.mailerProvider.sendEmail(email, textForEmail),
            this.updateUserPassword(user, newPass),
            this.disableUserTokens(user.id!),
        ]);
    }

    private async updateUserPassword(user: User, newPass: string): Promise<User> {
        const encodedPass = await argon2.hash(newPass);
        const userToUpdate = User.fromObject({ ...user, password: encodedPass });
        return await this.userRepository.save(userToUpdate);
    }

    private getTextForResetPassword(username: string, newPassword: string): string {
        return `
                Hi ${username},

                You asked us to reset your password. Please, find your new password: ${newPassword}
                `;
    }

    private generateRandom(substring: number): string {
        return Math.random().toString(36).substring(substring);
    }

    private async disableUserTokens(userId: number): Promise<void> {
        await Promise.all([
            this.disableAccessTokens(userId),
            this.disableRefreshTokens(userId),
        ]);
    }

    private async getTokenFromRequest(request: CoreRequest, response: CoreResponse): Promise<OAuth2Token> {
        try {
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            request.body.username = request.body.email;
            return await this.oauth.getToken(request, response);
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }

    private isTokenExpired(expires: Date): boolean {
        const currentTime = new Date().valueOf();
        const expiresTime = new Date(expires).valueOf();
        return currentTime > expiresTime;
    }

    private async disableAccessTokens(userId: number): Promise<void> {
        const tokensToUpdate = await this.accessTokenRepository.findAccessTokenListByUserId(userId);
        const updatedTokens = tokensToUpdate.map(token => this.disableToken(token));
        await this.accessTokenRepository.saveList(updatedTokens);
    }

    private async disableRefreshTokens(userId: number): Promise<void> {
        const tokensToUpdate = await this.refreshTokenRepository.findRefreshTokenListByUserId(userId);
        const updatedTokens = tokensToUpdate.map(token => this.disableToken(token));
        await this.refreshTokenRepository.saveList(updatedTokens);
    }

    private disableToken<T>(token: T): T {
        return {
            ...token,
            isActive: false,
        };
    }
}
