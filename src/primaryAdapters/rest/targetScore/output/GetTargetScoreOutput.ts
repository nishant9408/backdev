import { ApiProperty } from '@nestjs/swagger';

interface GetTargetScoreOutputBuilder {
    id: number | null;
    planScore: number;
    currentScore: number;
    monthlyScore: number;
    averageCalories: number;
    recommendations: string[];
    planCalories: number;
    averageActivity: number;
    planActivity: number;
}

export class GetTargetScoreOutput {
    @ApiProperty({ type: Number, description: 'integer' })
    id: number | null;

    @ApiProperty({ type: Number, description: 'integer' })
    planScore: number;

    @ApiProperty({ type: Number, description: 'integer' })
    currentScore: number;

    @ApiProperty({ type: Number, description: 'integer' })
    monthlyScore: number;

    @ApiProperty({ type: Number, description: 'integer' })
    averageCalories: number;

    @ApiProperty({ type: Number, description: 'integer' })
    planCalories: number;

    @ApiProperty({ type: Number, description: 'integer, ms' })
    averageActivity: number;

    @ApiProperty({ type: Number, description: 'integer, ms' })
    planActivity: number;

    @ApiProperty({ type: String, isArray: true })
    recommendations: string[];

    public static fromObject(builder: GetTargetScoreOutputBuilder): GetTargetScoreOutput {
        const targetScore = new GetTargetScoreOutput();
        targetScore.id = builder.id || null;
        targetScore.planScore = builder.planScore;
        targetScore.currentScore = builder.currentScore;
        targetScore.monthlyScore = builder.monthlyScore;
        targetScore.recommendations = builder.recommendations;
        targetScore.averageCalories = builder.averageCalories;
        targetScore.planCalories = builder.planCalories;
        targetScore.averageActivity = builder.averageActivity;
        targetScore.planActivity = builder.planActivity;
        return targetScore;
    }
}
