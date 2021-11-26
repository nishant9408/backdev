import { ApiProperty } from '@nestjs/swagger';

interface SendDailyDataOutputBuilder {
    score: number | null;
    sleep: number | null;
    steps: number | null;
    heartRate: number | null;
    calories: number | null;
}

export class SendDailyDataOutput {
    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    score: number | null;

    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    sleep: number | null;

    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    steps: number | null;

    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    heartRate: number | null;

    @ApiProperty({ type: Number, description: 'integer', nullable: true })
    calories: number | null;

    public static fromObject(builder: SendDailyDataOutputBuilder): SendDailyDataOutput {
        const data = new SendDailyDataOutput();
        data.score = builder.score;
        data.sleep = builder.sleep;
        data.steps = builder.steps;
        data.heartRate = builder.heartRate;
        data.calories = builder.calories;
        return data;
    }
}
