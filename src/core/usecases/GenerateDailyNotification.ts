// Daily Notifications!
// @Injectable()
// export class GenerateDailyNotification {
//     constructor(
//         @Inject(RepositoryType)
//         private readonly repositoryAdapter: Repository,
//         private readonly provideRecommendation: ProvideRecommendation,
//         private readonly findNearestMarket: FindNearestMarket,
//     ) { }
//
//     private static getRandomNutritionFactByCategory(category: string): string {
//         const categoryToFacts = {
//             ['plant proteins']: 'Plant-based proteins are good source probiotics, which balances intestinal microflora.',
// tslint:disable-next-line:max-line-length
//             ['animal proteins']: 'Products rich in animal protein contain all the essential amino acids that are necessary for the body and muscle tissue growth, good functioning of the immune system, skin, and hair beauty.',
// tslint:disable-next-line:max-line-length
//             ['vegetable fats']: 'Vegetable fats are a source of essential fatty acids such as omega-3s. Fatty acids are necessary for the normal functioning of every cell in the body and especially important for the prevention of cardiovascular diseases.',
// tslint:disable-next-line:max-line-length
//             ['animal fats']: 'Excess of animal fats in the diet can lead to a range of diseases, including cancer. Recommended choosing 1-2 meal servings from this group in a week.',
// tslint:disable-next-line:max-line-length
//             ['whole grains']: 'Whole grains are a good source of dietary fiber. Dietary fiber serves for microflora, removes toxins from the body, normalizes intestinal function.',
// tslint:disable-next-line:max-line-length
//             ['simple sugars']: 'Simple sugars are quick source of energy, but due to excess of sugar, they can be harmful in large quantities and lead to obesity, diabetes, accelerate aging.',
// tslint:disable-next-line:max-line-length
//             ['plant-based beverages']: 'Plant-based beverages are a great source of calcium, important for bone growth and prevention of osteoporosis.',
// tslint:disable-next-line:max-line-length
//             ['dairy fats']: 'Animal dairy products are a good source of calcium, as well as essential amino acids that support immunity, hormonal balance, and muscle growth.',
// tslint:disable-next-line:max-line-length
//             ['vegetables']: 'Vegetables are a source of fiber, vitamins, and phytonutrients. Have vegetables in your daily diet is the best way to protect yourself from cancer and maintain longevity.',
// tslint:disable-next-line:max-line-length
//             ['fruits']: 'Fruits are rich in antioxidants, fiber, and biologically active substances, which help them to fight with free radicals and protect against cancer, preserving youth and longevity.',
//         };
//
//         return category in categoryToFacts ? categoryToFacts[category] : '';
//     }
//
//     public async execute(userId: string, foodTime: FoodTime, notificationToken: string): Promise<Notification> {
//         const provider = await this.repositoryAdapter.getHealthProviderDataByDeviceId(userId);
//         if (!provider) throw new InternalServerErrorException('no provider');
//
//         const healthData = await this.repositoryAdapter.findHealthData(userId);
//         if (!healthData) throw new InternalServerErrorException('no health');
//
//         const recommendedCategories = await this.provideRecommendation.execute({ healthData, foodTime });
//
//         const nearestMarketLocation = await this.findNearestMarket.execute({ userId });
//
//         return Notification.fromObject({
//             token: notificationToken,
//             title: this.determinePushSubject(foodTime),
//             body: this.determinePushBody(recommendedCategories, foodTime),
//             data: {
//                 notificationType: NotificationType.DAILY,
//                 ...nearestMarketLocation ? {
//                     storeLon: `${nearestMarketLocation.longitude}`,
//                     storeLat: `${nearestMarketLocation.latitude}`,
//                     userLat: `${nearestMarketLocation.userLocation.latitude}`,
//                     userLon: `${nearestMarketLocation.userLocation.longitude}`,
//                     link: nearestMarketLocation.link,
//                 } : { },
//             },
//         });
//     }
//
//     private determinePushBody(categoriesList: string[], foodTime: FoodTime): string {
//         const beginning = this.determineBeginningOfTheBody(foodTime);
//         const categoriesString = categoriesList.join(', ');
//         const categoryNutrition = this.getRandomCategory(categoriesList);
//
//         return `${beginning} ${categoriesString}. ${categoryNutrition}`;
//     }
//
//     private getRandomCategory(categories: string[]): string {
//         const randomIndex = this.generateRandomInt(categories);
//         const category = categories[randomIndex];
//         return GenerateDailyNotification.getRandomNutritionFactByCategory(category);
//     }
//
//     private determineBeginningOfTheBody(foodTime: FoodTime): string {
//         switch (foodTime) {
//             case FoodTime.BREAKFAST:
//                 return 'Include in your serving';
//             case FoodTime.FIRST_SHACK:
//                 return 'Recharge your battery with';
//             case FoodTime.LUNCH:
//                 return 'Include in your meal';
//             case FoodTime.SECOND_SNACK:
//                 return 'Restore energy with some';
//             case FoodTime.DINNER:
//                 return 'Include in your diet';
//             default:
//                 throw new InternalServerErrorException('Unknown food time');
//         }
//     }
//
//     private determinePushSubject(foodTime: string): string {
//         switch (foodTime) {
//             case FoodTime.BREAKFAST:
//                 return '🥑Healthy breakfast options for you';
//             case FoodTime.FIRST_SHACK:
//                 return '🍎It is time to have your healthy break';
//             case FoodTime.LUNCH:
//                 return '🥦Healthy lunch suggestions for you';
//             case FoodTime.SECOND_SNACK:
//                 return '🍏It is time to have your healthy break';
//             case FoodTime.DINNER:
//                 return '🥗Healthy dinner options for you';
//             default:
//                 throw new InternalServerErrorException('Unknown food time');
//         }
//     }
//
//     private generateRandomInt(options: any[]): number {
//         const min = 0;
//         const max = options.length - 1;
//         return getRandomInt(min, max);
//     }
//
// }
