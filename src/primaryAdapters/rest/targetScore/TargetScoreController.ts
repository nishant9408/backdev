import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../../core/auth/application/data/internal/AuthUser';
import { CurrentUser } from '../../../core/auth/decorators/CurrentUser';
import { ProvideTargetScore } from '../../../core/usecases/ProvideTargetScore';
import { AuthGuard } from '../common/guard/AuthGuard';
import { GetTargetScoreOutput } from './output/GetTargetScoreOutput';

@Controller('target-score')
@ApiTags('Target Score')
export class TargetScoreController {
    constructor(
        private readonly provideTargetScore: ProvideTargetScore,
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: GetTargetScoreOutput })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async getDailyScore(
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<GetTargetScoreOutput> {
        const data = await this.provideTargetScore.execute(authUser.userId);
        return GetTargetScoreOutput.fromObject(data);
    }
}
