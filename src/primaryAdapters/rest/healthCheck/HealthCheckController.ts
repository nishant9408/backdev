import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from './output/HealthResponse';

@Controller('health')
export class HealthCheckController {
    @Get()
    isHealthy(): HealthResponse {
        return new HealthResponse(true);
    }
}
