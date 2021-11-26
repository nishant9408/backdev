import { ApiProperty } from '@nestjs/swagger';

interface GetDailyScoreOutputBuilder {
    score: number | null;
    sleep: number | null;
    steps: number | null;
    alert?: string | null;
    heartRate: number | null;
    calories: number | null;
    recommendations: string[];
    recommendedCalories: number;
}

export class GetDailyScoreOutput {
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

    @ApiProperty({ type: String, isArray: true })
    recommendations: string[];

    @ApiProperty({ type: Number })
    recommendedCalories: number;

    @ApiProperty({ type: String, nullable: true })
    alert: string | null;

    public static fromObject(builder: GetDailyScoreOutputBuilder): GetDailyScoreOutput {
        const data = new GetDailyScoreOutput();
        data.score = builder.score;
        data.steps = builder.steps;
        data.heartRate = builder.heartRate;
        data.calories = builder.calories;
        data.sleep = builder.sleep;
        data.recommendations = builder.recommendations;
        data.recommendedCalories = builder.recommendedCalories;
        data.alert = builder.alert || null;
        return data;
    }
}
