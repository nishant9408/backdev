import { ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class HealthResponse {
    @IsBoolean()
    @ApiResponseProperty()
    isHealthy: boolean;

    constructor(isHealthy: boolean) {
        this.isHealthy = isHealthy;
    }
}
