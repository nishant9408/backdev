import { Inject, Injectable } from '@nestjs/common';

import { UserResponse } from '../../../../../primaryAdapters/rest/user/data/response/UserResponse';
import { Mapper } from '../../../../sharedKernel/interfaces/Mapper';
import { User } from '../../../domain/data/User';

@Injectable()
export class UserResponseMapper implements Mapper<User, UserResponse> {

    map(from: User): UserResponse {
        return UserResponse.fromObject({
            ...from,
        });
    }
}

const UserResponseMapperType = Symbol.for('UserResponseMapper');
export { UserResponseMapperType };
