import { ApiProperty } from '@nestjs/swagger';

interface DailyScoreOutputBuilder {
    score: number | null;
    sleep: number | null;
    steps: number | null;
    heartRate: number | null;
    calories: number | null;
}

export class DailyScoreOutput {
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

    public static fromObject(builder: DailyScoreOutputBuilder): DailyScoreOutput {
        const data = new DailyScoreOutput();
        data.score = builder.score;
        data.steps = builder.steps;
        data.heartRate = builder.heartRate;
        data.calories = builder.calories;
        data.sleep = builder.sleep;
        return data;
    }
}
