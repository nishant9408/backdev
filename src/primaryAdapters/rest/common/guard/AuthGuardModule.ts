import { Module } from '@nestjs/common';

import { AuthModule } from '../../../../core/auth/AuthModule';
import { AuthPostgresModule } from '../../../../secondaryAdapters/postgres/auth/AuthPostgresModule';
import { UserPostgresModule } from '../../../../secondaryAdapters/postgres/user/UserPostgresModule';
import { AuthGuard } from './AuthGuard';

@Module({
    imports: [
        UserPostgresModule,
        AuthPostgresModule,
        AuthModule,
    ],
    providers: [
        AuthGuard,
    ],
    exports: [
        AuthGuard,
        UserPostgresModule,
        AuthPostgresModule,
    ],
})
export class AuthGuardModule { }
