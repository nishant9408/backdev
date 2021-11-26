import { Module } from '@nestjs/common';

import { UserPostgresModule } from '../../secondaryAdapters/postgres/user/UserPostgresModule';
import { CoreModule } from '../CoreModule';
import { UserResponseMapper, UserResponseMapperType } from './application/services/converters/UserResponseMapper';
import { UserManagementService } from './application/services/UserManagementService';
import { UserQueryService } from './application/services/UserQueryService';
import { UserRegistrationService } from './application/services/UserRegistrationService';

@Module({
    imports: [ UserPostgresModule, CoreModule ],
    providers: [
    {
        provide: UserResponseMapperType,
        useClass: UserResponseMapper,
    },
        UserQueryService,
        UserRegistrationService,
        UserManagementService,
    ],
    exports: [
        UserResponseMapperType,
        UserQueryService,
        UserRegistrationService,
        UserManagementService,
    ],
})
export class UserModule { }
