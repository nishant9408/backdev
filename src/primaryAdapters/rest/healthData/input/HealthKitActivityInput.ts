import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { ActivityInput } from './ActivityInput';
import { HealthDataInput } from './HealthDataInput';

export class HealthKitActivityInput {
    @IsString()
    @MinLength(5, { message: 'userId is too short' })
    @ApiProperty({
        type: String,
        minLength: 5,
    })
    userId: string;

    @ValidateNested()
    @Type(() => ActivityInput)
    @ApiProperty({ type: ActivityInput })
    activity: ActivityInput;

    @ValidateNested()
    @Type(() => HealthDataInput)
    @ApiProperty({ type: HealthDataInput })
    healthData: HealthDataInput;

}
