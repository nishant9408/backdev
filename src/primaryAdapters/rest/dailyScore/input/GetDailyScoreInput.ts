import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetDailyScoreInput {
    @IsString()
    @ApiProperty({ type: String })
    userId: string;
}
