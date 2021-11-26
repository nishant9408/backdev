import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as argon2 from 'argon2';
import logger from '../../../../configuration/Logger';
import { UpdateUserInput } from '../../../../primaryAdapters/rest/user/data/input/UpdateUserInput';
import { UpdateUserPasswordInput } from '../../../../primaryAdapters/rest/user/data/input/UpdateUserPasswordInput';
import { UserResponse } from '../../../../primaryAdapters/rest/user/data/response/UserResponse';
import { AuthService } from '../../../auth/application/services/AuthService';
import { MailerProvider, MailerProviderType } from '../../../ports/MailerProvider';
import { Mapper } from '../../../sharedKernel/interfaces/Mapper';
import { ScheduleDailyScorePushes } from '../../../usecases/ScheduleDailyScorePushes';
import { ScheduleSilentDailyPushes } from '../../../usecases/ScheduleSilentDailyPushes';
import { ScheduleTargetScorePushes } from '../../../usecases/ScheduleTargetScorePushes';
import { User } from '../../domain/data/User';
import { UserRepository, UserRepositoryType } from '../../port/UserRepository';
import { UserResponseMapperType } from './converters/UserResponseMapper';

@Injectable()
export class UserManagementService {
    constructor(
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(UserResponseMapperType)
        private readonly responseConverter: Mapper<User, UserResponse>,
        private readonly scheduleDailyScorePushes: ScheduleDailyScorePushes,
        private readonly scheduleSilentPushes: ScheduleSilentDailyPushes,
        private readonly scheduleTargetScorePushes: ScheduleTargetScorePushes,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) { }

    public async updateProfile(userId: number, data: UpdateUserInput): Promise<UserResponse> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const userToUpdate = User.fromObject({ ...user, ...data });
        const promises: any = [];

        if (data.notificationToken && data.notificationToken.length) {
            logger.info({ userId, token: data.notificationToken, message: 'updateProfile' });
            let users = await this.userRepository.findByNotificationToken(data.notificationToken);
            users = users.filter(u => u.id !== user.id);
            logger.info({ userId, token: data.notificationToken, users }, 'updateProfile');
            for (const user of users) {
                promises.push(this.userRepository.save({ ...user, notificationToken: '' }));
                try {
                    this.schedulerRegistry.deleteCronJob(`${user.id}-daily-score-push`);
                    this.schedulerRegistry.deleteCronJob(`${user.id}-silent-daily-score-push`);
                    this.schedulerRegistry.deleteCronJob(`${user.id}-target-score-push`);
                    logger.info({ userId, token: data.notificationToken, message: 'updateProfile, delete jobs' });
                } catch (e) {
                    logger.info({ userId }, e);
                }
            }
        }

        if ((data.timezone && data.timezone.length && data.timezone !== user.timezone) ||
            (data.notificationToken && data.notificationToken.length && data.notificationToken !== user.notificationToken)) {
            logger.info({ userId, token: data.notificationToken, message: 'Reschedule pushes' });
            const pushInfo = {
                userId,
                notificationToken: userToUpdate.notificationToken,
                timezone: userToUpdate.timezone,
            };
            promises.push(this.scheduleDailyScorePushes.execute(pushInfo));
            promises.push(this.scheduleSilentPushes.execute(pushInfo));
        }
        const [ updatedUser ] = await Promise.all([
            this.userRepository.save(userToUpdate),
            ...promises,
        ]);
        logger.info({ updatedUser });
        return this.responseConverter.map(updatedUser);
    }

    public async updatePassword(userId: number, data: UpdateUserPasswordInput): Promise<UserResponse> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        if (!await argon2.verify(user.password, data.oldPassword)) {
            throw new BadRequestException('Your current password is incorrect');
        }

        const updatedUser = await this.updateUserPassword(user, data.newPassword);
        return this.responseConverter.map(updatedUser);
    }

    private async updateUserPassword(user: User, newPass: string): Promise<User> {
        const encodedPass = await argon2.hash(newPass);
        const userToUpdate = User.fromObject({ ...user, password: encodedPass });
        return await this.userRepository.save(userToUpdate);
    }
}
