import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRepositoryType } from '../../../core/ports/MealRepository';
import { MealEntity } from './data/MealEntity';
import { MealsPostgresAdapter } from './MealsPostgresAdapter';

@Module({
    imports: [ TypeOrmModule.forFeature([
        MealEntity,
    ]) ],
    providers: [
        {
            provide: MealRepositoryType,
            useClass: MealsPostgresAdapter,
        },
    ],
    exports: [
        MealRepositoryType,
    ],
})
export class MealsPostgresModule {
}
