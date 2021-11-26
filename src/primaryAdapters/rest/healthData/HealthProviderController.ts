import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import config from '../../../configuration/config/Config';
import { HandleActivity } from '../../../core/usecases/HandleActivity';
import { HealthKitActivityInput } from './input/HealthKitActivityInput';

@Controller('health-provider')
export class HealthProviderController {
    constructor(
        private readonly handleActivity: HandleActivity,
    ) { }

    @Get('fitbit/activity')
    @ApiInternalServerErrorResponse({ description: 'Internal Error' })
    public async verifyEndpoint(
        @Req() request: Request, @Res() response: Response,
    ): Promise<void> {
        const verificationCode = config.fitbit.verificationCode;
        const code = request.query.verify === verificationCode ?
            HttpStatus.NO_CONTENT :
            HttpStatus.NOT_FOUND;

        response.status(code).send();
    }

    @Post('fitbit/activity')
    @ApiInternalServerErrorResponse({ description: 'Internal Error' })
    public async handleActivityFromFitbit(
        @Req() request: Request, @Res() response: Response,
    ): Promise<void> {
        const userId = request.body[0]['ownerId'];
        // await is missed because of fitbit requirements
        // tslint:disable-next-line:no-floating-promises
        this.handleActivity.execute({ userId });
        response.status(HttpStatus.NO_CONTENT).send();
    }

    @Post('activity')
    @ApiCreatedResponse()
    @ApiInternalServerErrorResponse()
    public async handleActivityFromHealthKit(
        @Body() input: HealthKitActivityInput,
    ): Promise<void> {
    }
}
