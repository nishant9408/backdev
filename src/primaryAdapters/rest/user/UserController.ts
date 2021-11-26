import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUser } from '../../../core/auth/application/data/internal/AuthUser';
import { CurrentUser } from '../../../core/auth/decorators/CurrentUser';
import { INTERNAL_ERROR, UNAUTHORIZED, USER_NOT_FOUND } from '../../../core/sharedKernel/constants';
import { SendDailyScorePush } from '../../../core/usecases/SendDailyScorePush';
import { SendDailySilencePush } from '../../../core/usecases/SendDailySilencePush';
import { SendTargetScorePush } from '../../../core/usecases/SendTargetScorePush';
import { UserManagementService } from '../../../core/user/application/services/UserManagementService';
import { UserQueryService } from '../../../core/user/application/services/UserQueryService';
import { AuthGuard } from '../common/guard/AuthGuard';
import { UpdateUserInput } from './data/input/UpdateUserInput';
import { UpdateUserPasswordInput } from './data/input/UpdateUserPasswordInput';
import { UserResponse } from './data/response/UserResponse';

@ApiTags('User')
@ApiInternalServerErrorResponse({ description: INTERNAL_ERROR })
@ApiNotFoundResponse({ description: USER_NOT_FOUND })
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserQueryService,
        private readonly userManagementService: UserManagementService,
        private readonly sendDailySilencePush: SendDailySilencePush,
        private readonly sendDailyScorePush: SendDailyScorePush,
        private readonly sendTargetScorePush: SendTargetScorePush,
    ) { }

    @Get('me')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        description: 'Current user profile information',
        type: UserResponse,
    })
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
    public async getUser(@CurrentUser({ required: true }) authUser: AuthUser): Promise<UserResponse> {
        return await this.userService.getUserByIdHandler(authUser.userId);
    }

    @Put()
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        description: 'Update user profile',
        type: UserResponse,
    })
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
    public async updateUser(
        @Body() input: UpdateUserInput,
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<UserResponse> {
        return await this.userManagementService.updateProfile(authUser.userId, input);
    }

    @Put('password')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        description: 'Update user password',
        type: UserResponse,
    })
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
    public async updateUserPassword(
        @Body() input: UpdateUserPasswordInput,
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<UserResponse> {
        return await this.userManagementService.updatePassword(authUser.userId, input);
    }

    @Put('pushes/daily-booster/silent')
    @UseGuards(AuthGuard)
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
    public async sendSilencePush(
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<void> {
        const user = await this.userService.getUserByIdHandler(authUser.userId);
        return await this.sendDailySilencePush.execute(user.notificationToken);
    }

    @Put('pushes/daily-booster')
    @UseGuards(AuthGuard)
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
    public async sendDailyBooster(
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<void> {
        const user = await this.userService.getUserByIdHandler(authUser.userId);
        return await this.sendDailyScorePush.execute(authUser.userId, user.notificationToken);
    }

    @Put('pushes/target-score')
    @UseGuards(AuthGuard)
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
    public async sendTargetBooster(
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<void> {
        const user = await this.userService.getUserByIdHandler(authUser.userId);
        return await this.sendTargetScorePush.execute(authUser.userId, user.notificationToken);
    }
}
