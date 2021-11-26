"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvideFoodInfoAndScore = void 0;
const common_1 = require("@nestjs/common");
const stringSimilarity = require("string-similarity");
const Diet_1 = require("../data/Diet");
const Food_1 = require("../data/Food");
const FoodAndScore_1 = require("../data/FoodAndScore");
const GenderType_1 = require("../data/GenderType");
const FoodProvider_1 = require("../ports/FoodProvider");
const MealRepository_1 = require("../ports/MealRepository");
const Repository_1 = require("../ports/Repository");
const UserRepository_1 = require("../user/port/UserRepository");
let ProvideFoodInfoAndScore = class ProvideFoodInfoAndScore {
    constructor(mealRepository, userRepository, foodProviderAdapter, repositoryAdapter) {
        this.mealRepository = mealRepository;
        this.userRepository = userRepository;
        this.foodProviderAdapter = foodProviderAdapter;
        this.repositoryAdapter = repositoryAdapter;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nutritionScore, userId } = data;
            const [foodInformation, userData, userScore] = yield Promise.all([
                this.foodProviderAdapter.getInfo(data.barcode),
                this.userRepository.findById(userId),
                this.repositoryAdapter.getDailyScoreByUserId(userId),
            ]);
            if (!foodInformation) {
                throw new common_1.NotFoundException('food not found');
            }
            if (!userData) {
                throw new common_1.NotFoundException('user not found');
            }
            if (!userScore) {
                throw new common_1.NotFoundException('user score not found');
            }
            const { productName, basicCategory: productCategory } = foodInformation;
            const { foodIntolerance } = userData;
            if (!productName || !productCategory) {
                return FoodAndScore_1.FoodAndScore.fromObject({
                    foodInformation: Object.assign(Object.assign({}, foodInformation), { basicCategory: null, productName: null }),
                    fitsDiet: false,
                    fitsTarget: false,
                    recommendation: [],
                });
            }
            let fitsProductToDiet = this.matchProductToIntoleranceList(productName, productCategory, foodIntolerance);
            const fitsProductToTarget = this.matchProductToCategories(productCategory);
            const { diet, foods } = userData;
            const userDiets = this.defineDiet(diet, foods);
            const allMealsForDiet = yield this.mealRepository.getMealsByDiet(userDiets);
            let suggestedMeals = [];
            let alternatives = [];
            if (!!fitsProductToDiet && !!fitsProductToTarget) {
                suggestedMeals = this.selectMealsForUser(allMealsForDiet, foodIntolerance, productName, productCategory);
                if (!suggestedMeals.length) {
                    fitsProductToDiet = false;
                    alternatives = this.selectMealsForUser(allMealsForDiet, foodIntolerance, null, null);
                }
            }
            else if (fitsProductToDiet && !fitsProductToTarget) {
                suggestedMeals = this.selectMealsForUser(allMealsForDiet, foodIntolerance, productName, null);
                if (!suggestedMeals.length) {
                    fitsProductToDiet = false;
                    alternatives = this.selectMealsForUser(allMealsForDiet, foodIntolerance, null, null);
                }
            }
            else if (!fitsProductToDiet || !fitsProductToTarget) {
                alternatives = this.selectMealsForUser(allMealsForDiet, foodIntolerance, null, null);
            }
            suggestedMeals = !fitsProductToDiet && !fitsProductToTarget ?
                [] :
                this.calculatePortion([
                    ...suggestedMeals,
                    ...alternatives,
                ], userData, userScore);
            return FoodAndScore_1.FoodAndScore.fromObject({
                foodInformation: Object.assign(Object.assign({}, foodInformation), { nutritionScore: foodInformation.nutritionScore || nutritionScore || null }),
                fitsDiet: fitsProductToDiet,
                fitsTarget: fitsProductToTarget,
                recommendation: suggestedMeals,
            });
        });
    }
    defineDiet(diet, foods) {
        if (diet === Diet_1.Diet.VEGETARIAN) {
            if (!foods.length)
                return [Diet_1.Diet.VEGAN];
            const diets = [];
            for (const food of foods) {
                switch (food) {
                    case Food_1.Food.EGGS:
                        diets.push(Diet_1.Diet.VEGETARIAN_WITH_EGGS);
                        break;
                    case Food_1.Food.FISH:
                        diets.push(Diet_1.Diet.VEGETARIAN_WITH_FISH);
                        break;
                    case Food_1.Food.MILK:
                        diets.push(Diet_1.Diet.VEGETARIAN_WITH_MILK);
                        break;
                }
            }
            return diets;
        }
        return [diet];
    }
    calculatePortion(meals, userData, userActivity) {
        if (!meals.length)
            return meals;
        const { gender, height, weight, targetWeight, age } = userData;
        const physicalActivity = this.calculatePhysicalActivity(userActivity.steps);
        const basalMetabolism = this.calculateBasalMetabolism(gender, height, weight, age);
        const dailyEnergyConsumption = this.calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, weight, targetWeight);
        const dailyCalories = (2 / 3) * dailyEnergyConsumption;
        const recommendedCalories = dailyCalories / 3;
        for (const meal of meals) {
            const recommendedCaloriesInGrams = recommendedCalories / meal.calories * 100;
            const rounded = Math.round(recommendedCaloriesInGrams / 10) * 10;
            meal.portion = Math.min(rounded, (userData.gender === GenderType_1.GenderType.MALE ? 500 : 350));
        }
        return meals;
    }
    calculatePhysicalActivity(steps) {
        if (!steps || steps <= 5000)
            return 1.2;
        if (steps <= 9999)
            return 1.3;
        return 1.4;
    }
    calculateBasalMetabolism(gender, height, weight, age) {
        const k = gender === GenderType_1.GenderType.MALE ? v => v + 5 : v => v - 161;
        const bx = k(10 * weight + 6.25 * height + 5 * age);
        return bx;
    }
    calculateDailyEnergyConsumption(physicalActivity, basalMetabolism, currentWeight, targetWeight) {
        const dailyEnergy = physicalActivity * basalMetabolism;
        if (currentWeight < targetWeight)
            return dailyEnergy + 0.2 * dailyEnergy;
        if (currentWeight > targetWeight)
            return Math.max(dailyEnergy - 0.2 * dailyEnergy, basalMetabolism);
        return dailyEnergy;
    }
    matchProductToCategories(productCategory) {
        const targetStrings = allCategories.map(c => this.makeSearchable(c));
        const mainString = this.makeSearchable(productCategory);
        const similarityOnIntolerance = stringSimilarity.findBestMatch(mainString, targetStrings);
        return similarityOnIntolerance.bestMatch.rating < 0.8;
    }
    matchProductToIntoleranceList(productName, productCategory, intoleranceList) {
        if (!intoleranceList.length)
            return true;
        const targetStrings = intoleranceList.map(c => this.makeSearchable(c));
        const mainStrings = [
            this.makeSearchable(productName),
            this.makeSearchable(productCategory),
        ];
        for (const mainString of mainStrings) {
            const similarityOnIntolerance = stringSimilarity.findBestMatch(mainString, targetStrings);
            if (similarityOnIntolerance.bestMatch.rating > 0.3)
                return false;
        }
        return true;
    }
    makeSearchable(str) {
        const reg = /[`~_|+-=;:'",./]/gi;
        return str.replace(reg, ' ').toLowerCase();
    }
    selectMealsForUser(meals, userIntolerance, productName, productCategory) {
        const mealsForUser = [];
        const searchableIntolerance = userIntolerance
            .map(ui => this.makeSearchable(ui));
        const searchableProduct = [
            ...productName ? this.makeSearchable(productName).split(' ') : [],
            ...productCategory ? this.makeSearchable(productCategory).split(' ') : [],
        ];
        for (const meal of meals) {
            if (this.isMealFittedForUser(meal.ingredients, searchableIntolerance, searchableProduct)) {
                mealsForUser.push(meal);
            }
        }
        return mealsForUser;
    }
    isMealFittedForUser(ingredients, searchableIntolerance, searchable) {
        let hasInt = false;
        for (const ui of searchableIntolerance) {
            const similarityOnIntolerance = stringSimilarity.findBestMatch(ui, ingredients);
            if (similarityOnIntolerance.bestMatch.rating > 0.3)
                hasInt = true;
            if (hasInt)
                return false;
        }
        let hasProduct = true;
        for (const str of searchable) {
            const similarityOnIntolerance = stringSimilarity.findBestMatch(str, ingredients);
            hasProduct = similarityOnIntolerance.bestMatch.rating > 0.4;
            if (hasProduct)
                break;
        }
        return hasProduct;
    }
};
ProvideFoodInfoAndScore = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(MealRepository_1.MealRepositoryType)),
    __param(1, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __param(2, (0, common_1.Inject)(FoodProvider_1.FoodProviderType)),
    __param(3, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ProvideFoodInfoAndScore);
exports.ProvideFoodInfoAndScore = ProvideFoodInfoAndScore;
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
//# sourceMappingURL=ProvideFoodInfoAndScore.js.map