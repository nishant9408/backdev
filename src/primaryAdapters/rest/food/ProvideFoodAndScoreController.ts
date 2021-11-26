import { Controller, Get, Inject, Injectable, Query, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthUser } from '../../../core/auth/application/data/internal/AuthUser';
import { CurrentUser } from '../../../core/auth/decorators/CurrentUser';
import { FoodAndScore } from '../../../core/data/FoodAndScore';
import { Mapper } from '../../../core/sharedKernel/interfaces/Mapper';
import { ProvideFoodInfoAndScore } from '../../../core/usecases/ProvideFoodInfoAndScore';
import { AuthGuard } from '../common/guard/AuthGuard';
import { FoodAndScoreInput } from './data/FoodAndScoreInput';
import { FoodAndScoreOutput } from './data/FoodAndScoreOutput';
import { FoodAndScoreOutputMapperType } from './mappers/FoodAndScoreOutputMapper';

@Controller('food')
export class ProvideFoodAndScoreController {
    constructor(
        @Inject(FoodAndScoreOutputMapperType)
        private readonly responseMapper: Mapper<FoodAndScore, FoodAndScoreOutput>,
        private readonly provideFoodAndScoreUseCase: ProvideFoodInfoAndScore,
    ) { }

    @Get('score')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: FoodAndScoreOutput })
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    async provideFoodAndScore(
        @Query() input: FoodAndScoreInput,
        @CurrentUser({ required: true }) authUser: AuthUser,
    ): Promise<FoodAndScoreOutput> {
        const data = await this.provideFoodAndScoreUseCase.execute({ ...input, userId: authUser.userId });
        return this.responseMapper.map(data);
    }
}
