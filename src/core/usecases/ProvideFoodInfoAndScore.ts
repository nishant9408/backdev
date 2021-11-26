import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as stringSimilarity from 'string-similarity';
import { DailyScore } from '../data/DailyScore';
import { Diet } from '../data/Diet';
import { Food } from '../data/Food';
import { FoodAndScore } from '../data/FoodAndScore';
import { GenderType } from '../data/GenderType';
import { Meal } from '../data/Meal';
import { ProvideFoodAndScoreDTO } from '../DTO/ProvideFoodAndScoreDTO';
import { FoodProvider, FoodProviderType } from '../ports/FoodProvider';
import { MealRepository, MealRepositoryType } from '../ports/MealRepository';
import { Repository, RepositoryType } from '../ports/Repository';
import { User } from '../user/domain/data/User';
import { UserRepository, UserRepositoryType } from '../user/port/UserRepository';

@Injectable()
export class ProvideFoodInfoAndScore {
    constructor(
        @Inject(MealRepositoryType)
        private readonly mealRepository: MealRepository,
        @Inject(UserRepositoryType)
        private readonly userRepository: UserRepository,
        @Inject(FoodProviderType)
        private readonly foodProviderAdapter: FoodProvider,
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(data: ProvideFoodAndScoreDTO): Promise<FoodAndScore> {
        const { nutritionScore, userId } = data;

        const [ foodInformation, userData, userScore ]  = await Promise.all([
            this.foodProviderAdapter.getInfo(data.barcode),
            this.userRepository.findById(userId),
            this.repositoryAdapter.getDailyScoreByUserId(userId),
        ]);

        if (!foodInformation) {
            throw new NotFoundException('food not found');
        }

        if (!userData) {
            throw new NotFoundException('user not found');
        }

        if (!userScore) {
            throw new NotFoundException('user score not found');
        }

        const { productName, basicCategory: productCategory } = foodInformation;
        const { foodIntolerance } = userData;

        if (!productName || !productCategory) {
            return FoodAndScore.fromObject({
                foodInformation: {
                    ...foodInformation,
                    basicCategory: null,
                    productName: null,
                },
                fitsDiet: false,
                fitsTarget: false,
                recommendation: [],
            });
        }

        let fitsProductToDiet = this.matchProductToIntoleranceList(productName, productCategory, foodIntolerance);
        const fitsProductToTarget = this.matchProductToCategories(productCategory);

        const { diet, foods } = userData;
        const userDiets = this.defineDiet(diet, foods);
        const allMealsForDiet = await this.mealRepository.getMealsByDiet(userDiets);

        let suggestedMeals: Meal[] = [];
        let alternatives: Meal[] = [];
        if (!!fitsProductToDiet && !!fitsProductToTarget) {
            suggestedMeals = this.selectMealsForUser(allMealsForDiet, foodIntolerance, productName, productCategory);
            if (!suggestedMeals.length) {
                fitsProductToDiet = false;
                alternatives = this.selectMealsForUser(allMealsForDiet, foodIntolerance, null, null);
            }
        } else if (fitsProductToDiet && !fitsProductToTarget) {
            suggestedMeals = this.selectMealsForUser(allMealsForDiet, foodIntolerance, productName, null);
            if (!suggestedMeals.length) {
                fitsProductToDiet = false;
                alternatives = this.selectMealsForUser(allMealsForDiet, foodIntolerance, null, null);
            }
        } else if (!fitsProductToDiet || !fitsProductToTarget) {
            alternatives = this.selectMealsForUser(allMealsForDiet, foodIntolerance, null, null);
        }
      
        suggestedMeals = !fitsProductToDiet && !fitsProductToTarget ?
            [ ] :
            this.calculatePortion([
                ...suggestedMeals,
                ...alternatives,
            ], userData, userScore);

        return FoodAndScore.fromObject({
            foodInformation: {
                ...foodInformation,
                nutritionScore: foodInformation.nutritionScore || nutritionScore || null,
            },
            fitsDiet: fitsProductToDiet,
            fitsTarget: fitsProductToTarget,
            recommendation: suggestedMeals,
        });
    }

    private defineDiet(diet: Diet, foods: Food[]): Diet[] {
        if (diet === Diet.VEGETARIAN) {
            if (!foods.length) return [ Diet.VEGAN ]; // VEGETARIAN without foods is vegan lol
            const diets: Diet[] = [];
            for (const food of foods) {
                switch (food) {
                    case Food.EGGS:
                        diets.push(Diet.VEGETARIAN_WITH_EGGS);
                        break;
                    case Food.FISH:
                        diets.push(Diet.VEGETARIAN_WITH_FISH);
                        break;
                    case Food.MILK:
                        diets.push(Diet.VEGETARIAN_WITH_MILK);
                        break;
                }
            }

            return diets;
        }

        return [ diet ];
    }

    private calculatePortion(meals: Meal[], userData: User, userActivity: DailyScore): Meal[] {
        if (!meals.length) return meals;
        const { gender, height, weight, targetWeight, age } = userData;
        const physicalActivity = this.calculatePhysicalActivity(userActivity.steps);
        const basalMetabolism = this.calculateBasalMetabolism(gender, height, weight, age);
        const dailyEnergyConsumption = this.calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, weight, targetWeight);
        const dailyCalories = (2 / 3) * dailyEnergyConsumption;
        const recommendedCalories = dailyCalories / 3;
        for (const meal of meals) {
            const recommendedCaloriesInGrams = recommendedCalories / meal.calories * 100;
            const rounded = Math.round(recommendedCaloriesInGrams / 10) * 10;
            meal.portion = Math.min(rounded, (userData.gender === GenderType.MALE ? 500 : 350));
        }
        return meals;
    }

    private calculatePhysicalActivity(steps: number | null): number {
        if (!steps || steps <= 5000) return 1.2;
        if (steps <= 9999) return 1.3;
        return 1.4;
    }

    private calculateBasalMetabolism(gender: GenderType, height: number, weight: number, age: number): number {
        const k = gender === GenderType.MALE ? v => v + 5 : v => v - 161;
        const bx = k(10 * weight + 6.25 * height + 5 * age);
        return bx;
    }

    private calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, currentWeight, targetWeight: number): number {
        const dailyEnergy = physicalActivity * basalMetabolism;
        if (currentWeight < targetWeight) return dailyEnergy + 0.2 * dailyEnergy;
        if (currentWeight > targetWeight) return Math.max(dailyEnergy - 0.2 * dailyEnergy, basalMetabolism);
        return dailyEnergy;
    }

    private matchProductToCategories(productCategory: string): boolean {
        const targetStrings = allCategories.map(c => this.makeSearchable(c));
        const mainString = this.makeSearchable(productCategory);
        const similarityOnIntolerance = stringSimilarity.findBestMatch(mainString, targetStrings);
        return similarityOnIntolerance.bestMatch.rating < 0.8;
    }

    private matchProductToIntoleranceList(productName: string, productCategory: string, intoleranceList: string[]): boolean {
        if (!intoleranceList.length) return true;

        const targetStrings = intoleranceList.map(c => this.makeSearchable(c));
        const mainStrings = [
            this.makeSearchable(productName),
            this.makeSearchable(productCategory),
        ];

        for (const mainString of mainStrings) {
            const similarityOnIntolerance = stringSimilarity.findBestMatch(mainString, targetStrings);
            if (similarityOnIntolerance.bestMatch.rating > 0.3) return false;
        }

        return true;
    }

    private makeSearchable(str: string): string {
        const reg = /[`~_|+-=;:'",./]/gi;
        return str.replace(reg, ' ').toLowerCase();
    }

    private selectMealsForUser(
        meals: Meal[],
        userIntolerance: string[],
        productName: string | null,
        productCategory: string | null,
    ): Meal[] {
        const mealsForUser: Meal[] = [];
        const searchableIntolerance = userIntolerance
            .map(ui => this.makeSearchable(ui));

        const searchableProduct = [
            ...productName ? this.makeSearchable(productName).split(' ') : [ ],
            ...productCategory ? this.makeSearchable(productCategory).split(' ') : [ ],
        ];

        for (const meal of meals) {
            if (this.isMealFittedForUser(meal.ingredients, searchableIntolerance, searchableProduct)) {
                mealsForUser.push(meal);
            }
        }

        return mealsForUser;
    }

    private isMealFittedForUser(ingredients: string[], searchableIntolerance: string[], searchable: string[]): boolean {
        let hasInt = false;

        for (const ui of searchableIntolerance) {
            const similarityOnIntolerance = stringSimilarity.findBestMatch(ui, ingredients);
            if (similarityOnIntolerance.bestMatch.rating > 0.3) hasInt = true;
            if (hasInt) return false;
        }

        let hasProduct = true;
        for (const str of searchable) {
            const similarityOnIntolerance = stringSimilarity.findBestMatch(str, ingredients);
            hasProduct = similarityOnIntolerance.bestMatch.rating > 0.4;
            if (hasProduct) break;
        }

        return hasProduct;
    }
}

const allCategories = [
    'Chocolate candies',
    'Spreads',
    'Sweet spreads',
    'Sausages',
    'Chips and fries',
    'Crisps',
    'Smoked sausages',
    'Spreadable fats',
    'Mayonnaises',
    'Dairy spread',
    'Salted spreads',
    'Refried beans',
    'Roasted peanuts',
    'roasted-salted-almonds',
    'Smoked fishes',
    'Smoked salmons',
    'Sauces',
    'Dips',
    'Salty snacks',
    'Appetizers',
    'Dehydrated sauces',
    'Hot sauces',
    'Pasta sauces',
    'Barbecue sauces',
    'Ketchup',
    'Salad dressings',
    'Sweet snacks',
    'Biscuits and cakes',
    'Confectioneries',
    'Desserts',
    'Biscuits',
    'Frozen desserts',
    'Cakes',
    'Sweeteners',
    'Pizzas pies and quiches',
    'Pizzas',
    'Pastries',
    'Dessert mixes',
    'Cake mixes',
    'Syrups',
    'Simple syrups',
    'Sugars',
    'Creams',
    'Pie dough',
    'Ice creams and sorbets',
    'Crackers',
    'Ice creams',
    'Chocolates',
    'Fruit-based beverages',
    'Juices and nectars',
    'Sweetened beverages',
    'Candies',
    'Fruit juices',
    'Bars',
    'Popcorn',
    'White breads',
    'Breakfast cereals',
    'cookies',
    'Gelified candies',
    'Pies',
    'Sweet pies',
    'Fruits in syrup',
    'Compotes',
    'Artificially sweetened beverages',
    'Apple compotes',
    'Pancake mixes',
    'Dark chocolates',
    'Wheat breads',
    'Assorted chocolates',
    'Bonbons',
    'Colas',
    'Apple juices',
    'Maple syrups',
    'Red kidney beans',
    'Toaster pastries',
    'Milk chocolates',
    'Concentrated fruit juices',
    'Jelly beans',
    'Ice cream sandwiches',
    'Hamburger buns',
    'Lemonade',
    'Peaches in syrup',
    'Jams',
    'Wafers',
    'Hot dog buns',
    'Gummy bears',
    'Flakes',
    'Orange juices',
    'Bagel breads',
    'Chocolate truffles',
    'Stuffed wafers',
    'Cherries in syrup',
    'Puffed rice cakes',
    'Snacks',
    'Carbonated drinks',
    'Sodas',
    'Cooking helpers',
    'Dried products to be rehydrated',
    'baking-decorations',
    'Pastry helpers',
    'Dehydrated beverages',
    'Iced teas',
    'mexican-dinner-mixes',
    'Stuffing',
];
