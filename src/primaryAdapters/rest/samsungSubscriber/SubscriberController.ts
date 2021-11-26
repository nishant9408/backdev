import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { SaveSamsungSubscriber } from '../../../core/usecases/SaveSamsungSubscriber';
import { SamsungSubscriberInput } from './input/SamsungSubscriberInput';

@Controller('subscribers')
export class SubscriberController {
    constructor(
        private readonly saveSamsungSubscriber: SaveSamsungSubscriber,
    ) { }

    @Post('samsung')
    @ApiCreatedResponse({ description: 'Saved' })
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    public async saveSamsung(
        @Body() input: SamsungSubscriberInput,
    ): Promise<void> {
        await this.saveSamsungSubscriber.execute(input);
    }
}
