import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { DailyScoreParams } from './DailyScoreParams';

export class SaveDailyScoreInput {
    // @IsString()
    // @MinLength(10, { message: 'notificationToken is too short' })
    // @ApiProperty({
    //     type: String,
    //     minLength: 10,
    //     example: 'token-010102013123-sd',
    // })
    // notificationToken: string;
    //
    // @IsString()
    // @ApiProperty({ example: 'Europe/Kiev' })
    // timezone: string;

    // @IsOptional()
    // @ValidateNested()
    // @Type(() => HealthDataInput)
    // @ApiProperty({ type: HealthDataInput, nullable: true })
    // healthData: HealthDataInput | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => DailyScoreParams)
    @ApiProperty({ type: DailyScoreParams, nullable: true, description: 'required for health kit' })
    dailyScoreParams: DailyScoreParams;
}
