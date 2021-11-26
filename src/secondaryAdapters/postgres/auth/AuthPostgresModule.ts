import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenRepositoryType } from '../../../core/auth/port/AccessTokenRepository';
import { AuthClientRepositoryType } from '../../../core/auth/port/AuthClientRepository';
import { RefreshTokenRepositoryType } from '../../../core/auth/port/RefreshTokenRepository';
import { UserPostgresModule } from '../user/UserPostgresModule';
import { AccessTokenEntity } from './data/AccessTokenEntity';
import { AuthClientEntity } from './data/AuthClientEntity';
import { RefreshTokenEntity } from './data/RefreshTokenEntity';
import { AccessTokenRepositoryAdapter } from './repository/AccessTokenRepositoryAdapter';
import { AuthClientRepositoryAdapter } from './repository/AuthClientRepositoryAdapter';
import { RefreshTokenRepositoryAdapter } from './repository/RefreshTokenRepositoryAdapter';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccessTokenEntity,
            RefreshTokenEntity,
            AuthClientEntity,
        ]),
        UserPostgresModule,
    ],
    providers: [
        {
            provide: AccessTokenRepositoryType,
            useClass: AccessTokenRepositoryAdapter,
        },
        {
            provide: AuthClientRepositoryType,
            useClass: AuthClientRepositoryAdapter,
        },
        {
            provide: RefreshTokenRepositoryType,
            useClass: RefreshTokenRepositoryAdapter,
        },
    ],
    exports: [
        AccessTokenRepositoryType,
        AuthClientRepositoryType,
        RefreshTokenRepositoryType,
    ],
})
export class AuthPostgresModule { }
