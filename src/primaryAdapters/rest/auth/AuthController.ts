import { Body, Controller, Delete, Inject, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import {
    ApiBody,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import logger from '../../../configuration/Logger';
import { AuthUser } from '../../../core//auth/application/data/internal/AuthUser';
import { AuthService } from '../../../core//auth/application/services/AuthService';
import { CurrentUser } from '../../../core//auth/decorators/CurrentUser';
import { HealthProvider } from '../../../core/data/HealthProvider';
import { HealthProviderName } from '../../../core/data/HealthProviderName';
import { Repository, RepositoryType } from '../../../core/ports/Repository';
import { INTERNAL_ERROR, NOT_VALID, SUCCESS, USER_NOT_FOUND } from '../../../core/sharedKernel/constants';
import { CoreRequest } from '../../../core/sharedKernel/http/CoreRequest';
import { CoreResponse } from '../../../core/sharedKernel/http/CoreResponse';
import { Mapper } from '../../../core/sharedKernel/interfaces/Mapper';
import { sendResponse, validateOrThrow } from '../../../core/sharedKernel/router';
import { ScheduleDailyScorePushes } from '../../../core/usecases/ScheduleDailyScorePushes';
import { ScheduleFitbitPulling } from '../../../core/usecases/ScheduleFitbitPulling';
import { ScheduleSilentDailyPushes } from '../../../core/usecases/ScheduleSilentDailyPushes';
import { UserQueryService } from '../../../core/user/application/services/UserQueryService';
import { AuthGuard } from '../common/guard/AuthGuard';
import { OpenAuthGuard } from '../common/guard/OpenAuthGuard';
import { ExpressRequestMapperType } from '../common/mappers/ExpressRequestMapper';
import { ExpressResponseMapperType } from '../common/mappers/ExpressResponseMapper';
import { LoginInput } from './data/input/LoginInput';
import { RefreshInput } from './data/input/RefreshInput';
import { RegistrationInput } from './data/input/RegistrationInput';
import { ResetPassword } from './data/input/ResetPassword';
import { AuthTokenResponse } from './data/response/AuthTokenResponse';

@Controller()
@ApiTags('Registration | Login')
@ApiInternalServerErrorResponse({ description: INTERNAL_ERROR })
@ApiNotFoundResponse({ description: USER_NOT_FOUND })
@ApiUnprocessableEntityResponse({ description: NOT_VALID })
export class AuthController {
    constructor(
        private readonly scheduleDailyScorePushes: ScheduleDailyScorePushes,
        private readonly scheduleSilentDailyScorePushes: ScheduleSilentDailyPushes,
        private readonly authService: AuthService,
        @Inject(RepositoryType)
        private readonly repository: Repository,
        @Inject(ExpressRequestMapperType)
        private readonly requestMapper: Mapper<Request, CoreRequest>,
        @Inject(ExpressResponseMapperType)
        private readonly responseMapper: Mapper<Response, CoreResponse>,
        private readonly userService: UserQueryService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly scheduleFitbitPulling: ScheduleFitbitPulling,
    ) { }

    @Post('registration')
    @UseGuards(OpenAuthGuard)
    @ApiBody({ description: 'Registration input', type: RegistrationInput })
    @ApiOkResponse({ description: 'User has been registered successfully', type: AuthTokenResponse })
    public async registrationAndLogin(@Req() request: Request, @Res() response: Response): Promise<void> {
        await validateOrThrow(RegistrationInput, request);
        const req = this.requestMapper.map(request);
        const res = this.responseMapper.map(response);
        const userData = request.body as RegistrationInput;
        const user = await this.authService.registration(req, res);
        const [ loginResp ] = await Promise.all([
            this.authService.login(req, res),
            this.scheduleDailyScorePushes.execute({
                userId: user.id!,
                timezone: userData.timezone,
                notificationToken: userData.notificationToken,
            }),
            this.scheduleSilentDailyScorePushes.execute({
                userId: user.id!,
                timezone: userData.timezone,
                notificationToken: userData.notificationToken,
            }),
            this.repository.saveHealthProviderData(HealthProvider.fromObject({
                uId: user.id!,
                name: userData!.provider.name,
                timezone: userData.timezone,
                accessToken: userData.provider.accessToken,
                refreshToken: userData.provider.refreshToken,
                expiresIn: userData.provider.expiresIn,
                scope: userData.scope,
                userId: userData.provider.userId,
                tokenType: userData.provider.tokenType,
            })),
        ]);
        if (user!.id && user.timezone && userData.provider.name === HealthProviderName.FITBIT) {
            await this.scheduleFitbitPulling.execute(user.id, user.timezone);
        }
        sendResponse(loginResp, response);
    }

    @Post('login')
    @UseGuards(OpenAuthGuard)
    @ApiBody({ description: 'Login input', type: LoginInput })
    @ApiOkResponse({ description: 'User has been login successfully', type: AuthTokenResponse })
    public async login(@Req() request: Request, @Res() response: Response): Promise<void> {
        await validateOrThrow(LoginInput, request);
        const result = await this.authService.login(
            this.requestMapper.map(request),
            this.responseMapper.map(response),
        );
        const user = await this.userService.findUserByEmail(request.body.username);
        if (user) {
            await Promise.all([
                this.scheduleDailyScorePushes.execute({
                    userId: user.id!,
                    timezone: user.timezone,
                    notificationToken: user.notificationToken,
                }),
                this.scheduleSilentDailyScorePushes.execute({
                    userId: user.id!,
                    timezone: user.timezone,
                    notificationToken: user.notificationToken,
                }),
            ]);
            logger.info({ userId: user.id, message: 'reschedule pushes after login' });
        }
        sendResponse(result, response);
    }

    @Post('refresh-token')
    @UseGuards(OpenAuthGuard)
    @ApiBody({ description: 'Refresh token', type: RefreshInput })
    @ApiOkResponse({ description: 'Access token has been refreshed successfully', type: AuthTokenResponse })
    public async refreshToken(@Req() request: Request, @Res() response: Response): Promise<void> {
        await validateOrThrow(RefreshInput, request);
        const result = await this.authService.refreshLogin(
            this.requestMapper.map(request),
            this.responseMapper.map(response),
        );
        sendResponse(result, response);
    }

    @Delete('logout')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: SUCCESS })
    public async logout(@CurrentUser({ required: true }) authUser: AuthUser): Promise<void> {
        await this.authService.logout(authUser.accessToken);
        const { userId } = authUser;
        try {
            this.schedulerRegistry.deleteCronJob(`${userId}-daily-score-push`);
            this.schedulerRegistry.deleteCronJob(`${userId}-silent-daily-score-push`);
            this.schedulerRegistry.deleteCronJob(`${userId}-target-score-push`);
            logger.info({ userId, message: 'destroyed pushes after logout' });
        } catch (e) {
            logger.info({ userId, message: 'destroyed pushes after logout' });
            logger.info({ e });
        }
    }

    @Put('password/reset')
    @ApiOkResponse({
        description: 'Reset user password',
    })
    public async resetUserPassword(
        @Body() input: ResetPassword,
    ): Promise<void> {
        return await this.authService.resetPassword(input.email);
    }
}
