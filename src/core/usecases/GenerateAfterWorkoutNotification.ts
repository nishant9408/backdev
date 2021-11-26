// Workout Based Notifications!
// @Injectable()
// export class GenerateAfterWorkoutNotification {
//     constructor(
//         @Inject(HealthProviderPortType)
//         private readonly healthProviderAdapter: HealthProviderPort,
//         @Inject(RepositoryType)
//         private readonly repositoryAdapter: Repository,
//         @Inject(NotificationServiceType)
//         private readonly notificationServiceAdapter: NotificationService,
//         private readonly provideRecommendationAfterWorkout: ProvideRecommendationAfterWorkout,
//         private readonly findNearestMarket: FindNearestMarket,
//     ) { }
//
//     public async execute(request: GenerateAfterWorkoutNotificationDTO): Promise<void> {
//         const { calories, providerData: { userId } } = request;
//
//         const recommendation = this.provideRecommendationAfterWorkout.execute({ calories });
//         const nearestMarketLocation = await this.findNearestMarket.execute({ userId });
//
//         const device = await this.repositoryAdapter.findDeviceData(userId);
//         if (!device) {
//             throw new BadRequestException('No such device');
//         }
//
//         const notification = Notification.fromObject({
//             token: device.notificationToken!,
//             body: `Recharge your energy with ${recommendation}`,
//             title: '🥇Great training, keep going!',
//             data: {
//                 notificationType: NotificationType.WORKOUT,
//                 ...nearestMarketLocation ? {
//                     storeLon: `${nearestMarketLocation.longitude}`,
//                     storeLat: `${nearestMarketLocation.latitude}`,
//                     userLat: `${nearestMarketLocation.userLocation.latitude}`,
//                     userLon: `${nearestMarketLocation.userLocation.longitude}`,
//                     link: nearestMarketLocation.link,
//                 } : { },
//             },
//         });
//
//         await this.notificationServiceAdapter.send(notification);
//     }
// }
