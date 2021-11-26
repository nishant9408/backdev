import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet } from '../../../core/data/Diet';
import { Meal } from '../../../core/data/Meal';
import { MealRepository } from '../../../core/ports/MealRepository';
import { MealEntity } from './data/MealEntity';

@Injectable()
export class MealsPostgresAdapter implements MealRepository {
    constructor(
        @InjectRepository(MealEntity)
        private readonly repository: Repository<MealEntity>,
    ) { }

    public async getMealsByDiet(diets: Diet[]): Promise<Meal[]> {
        const where = diets.map(diet => ({ diet }));
        const entities = await this.repository.find({ where, cache: true });
        return entities.map(e => Meal.fromObject(e));
    }
}
