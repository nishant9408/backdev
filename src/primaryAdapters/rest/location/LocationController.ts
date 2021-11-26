import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { SaveDeviceInformation } from '../../../core/usecases/SaveDeviceInformation';
import { SaveLocation } from '../../../core/usecases/SaveLocation';
import { SaveTimezone } from '../../../core/usecases/SaveTimezone';
import { LocationInput } from './input/LocationInput';

@Controller('location')
export class LocationController {
    constructor(
        private readonly saveLocation: SaveLocation,
        private readonly saveTimezone: SaveTimezone,
    ) { }

    @Post()
    @ApiCreatedResponse({ description: 'Saved' })
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    public async save(
        @Body() input: LocationInput,
    ): Promise<void> {
        await Promise.all([
            this.saveLocation.execute(input),
            this.saveTimezone.execute(input),
        ]);
    }
}
