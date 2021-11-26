import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as argon2 from 'argon2';
import logger from '../../../../configuration/Logger';
import { RegistrationInput } from '../../../../primaryAdapters/rest/auth/data/input/RegistrationInput';
import { UserResponse } from '../../../../primaryAdapters/rest/user/data/response/UserResponse';
import { Mapper } from '../../../sharedKernel/interfaces/Mapper';
import { User } from '../../domain/data/User';
import { UserRepository, UserRepositoryType } from '../../port/UserRepository';
import { UserResponseMapperType } from './converters/UserResponseMapper';

@Injectable()
export class UserRegistrationService {
    constructor(
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(UserResponseMapperType)
        private readonly responseConverter: Mapper<User, UserResponse>,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) { }

    public async registration(data: RegistrationInput): Promise<UserResponse> {
        const user = await this.userRepository.findByEmail(data.email);

        if (user) {
            throw new BadRequestException('This email already registered');
        } // TODO: create duplicationError

        const encryptedPassword = await argon2.hash(data.password);

        const newUser = User.fromObject({
            ...data,
            password: encryptedPassword,
        });

        const savedUser = await this.createUser(newUser);

        return this.responseConverter.map(User.fromObject({
            ...savedUser,
        }));
    }

    public async createUser(userData: User): Promise<User> {
        const promises: any = [];
        if (userData.notificationToken) {
            const users = await this.userRepository.findByNotificationToken(userData.notificationToken);
            for (const user of users) {
                promises.push(this.userRepository.save({ ...user, notificationToken: '' }));
                try {
                    this.schedulerRegistry.deleteCronJob(`${user.id}-daily-score-push`);
                    this.schedulerRegistry.deleteCronJob(`${user.id}-silent-daily-score-push`);
                    this.schedulerRegistry.deleteCronJob(`${user.id}-target-score-push`);
                } catch (e) {
                    logger.info({ e });
                }
            }
        }
        const [ newUser ] = await Promise.all([
            this.userRepository.save(userData),
            ...promises,
        ]);
        return newUser;
    }
}
