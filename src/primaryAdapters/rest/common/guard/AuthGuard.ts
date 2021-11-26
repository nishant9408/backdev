import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../../../../core/auth/application/services/AuthService';
import { AccessTokenRepository, AccessTokenRepositoryType } from '../../../../core/auth/port/AccessTokenRepository';
import { UserRepository, UserRepositoryType } from '../../../../core/user/port/UserRepository';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(AccessTokenRepositoryType)
        private readonly accessTokenRepository: AccessTokenRepository,
        @Inject(AuthService)
        private readonly authService: AuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationValue = request.headers.authorization;
        if (!authorizationValue) {
            throw new UnauthorizedException('Invalid token');
        }

        const bearerToken = authorizationValue.split(' ')[1];
        if (!bearerToken) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = await this.authService.getAuthUser(bearerToken);

        return true;
    }
}
