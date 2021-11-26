import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../../core/auth/application/data/internal/AuthUser';
import { CurrentUser } from '../../../core/auth/decorators/CurrentUser';
import { GenerateDailyScore } from '../../../core/usecases/GenerateDailyScore';
import { GenerateTargetScore } from '../../../core/usecases/GenerateTargetScore';
import { ProvideDailyScore } from '../../../core/usecases/ProvideDailyScore';
import { AuthGuard } from '../common/guard/AuthGuard';
import { SendDailyDataInput } from './input/SendDailyDataInput';
import { GetDailyScoreOutput } from './output/GetDailyScoreOutput';

@Controller('daily-score')
@ApiTags('Daily Score')
export class DailyScoreController {
    constructor(
        private readonly generateDailyScore: GenerateDailyScore,
        private readonly provideDailyScore: ProvideDailyScore,
        private readonly generateTargetScore: GenerateTargetScore,
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    public async sendDailyData(
        @Body() input: SendDailyDataInput,
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<void> {
        await this.generateDailyScore.execute({
            userId: authUser.userId,
            ...input,
        });
        // update target score after generating of daily score;
        await this.generateTargetScore.execute(authUser.userId);
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: GetDailyScoreOutput })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async getDailyScore(
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<GetDailyScoreOutput> {
       const data = await this.provideDailyScore.execute({ userId: authUser.userId });
       return GetDailyScoreOutput.fromObject(data || {
           score: null,
           sleep: null,
           steps: null,
           heartRate: null,
           calories: null,
           recommendedCalories: 0,
           recommendations: [],
       });
    }
}
