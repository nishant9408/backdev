import { Injectable } from '@nestjs/common';
import { Converter } from '../../../../core/sharedKernel/interfaces/Converter';
import { User } from '../../../../core/user/domain/data/User';
import { UserEntity } from '../data/UserEntity';

@Injectable()
export class UserEntityConverter implements Converter<User, UserEntity> {

    from(from: User): UserEntity {
        return UserEntity.fromObject({ ...from });
    }

    to(to: UserEntity): User {
        return User.fromObject({ ...to });
    }
}

const UserEntityConverterType = Symbol.for('UserEntityConverter');
export { UserEntityConverterType };
