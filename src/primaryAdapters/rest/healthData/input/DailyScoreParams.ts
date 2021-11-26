import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class DailyScoreParams {
    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    sleep: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    steps: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    heartRate: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    restingHeartRate: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    calories: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    lightWorkout: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    moderateWorkout: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    hardWorkout: number | null;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    totalActivity: number | null;
}
