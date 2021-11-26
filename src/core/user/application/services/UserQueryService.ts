import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../../../primaryAdapters/rest/user/data/response/UserResponse';
import { TryFind } from '../../../sharedKernel/common/wrappers/TryFind';
import { Mapper } from '../../../sharedKernel/interfaces/Mapper';
import { User } from '../../domain/data/User';
import { UserRepository, UserRepositoryType } from '../../port/UserRepository';
import { UserResponseMapperType } from './converters/UserResponseMapper';

@Injectable()
export class UserQueryService {
    constructor(
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(UserResponseMapperType)
        private readonly responseConverter: Mapper<User, UserResponse>,
    ) { }

    public async getUserByIdHandler(userId: number): Promise<UserResponse> {
        const user = await this.getUserById(userId);
        return this.responseConverter.map(User.fromObject({
            ...user,
        }));
    }

    public async getUserById(userId: number): Promise<User> {
        const user = await TryFind.of(() => this.userRepository.findById(userId)).getOrThrow('User is not found');
        return User.fromObject({
            ...user,
        });
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        return user ? User.fromObject({
            ...user,
        }) : null;
    }

    public async getUserByEmail(email: string): Promise<UserResponse | null> {
        const user = await this.userRepository.findByEmail(email);
        return user ? this.responseConverter.map(User.fromObject({
            ...user,
        })) : null;
    }
}
