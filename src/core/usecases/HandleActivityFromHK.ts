// import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { Transactional } from 'typeorm-transactional-cls-hooked';
// import { HandleActivityFromHKDTO } from '../DTO/HandleActivityFromHKDTO';
// import { Repository, RepositoryType } from '../ports/Repository';
// import { SaveHealthData } from './SaveHealthData';
//
// @Injectable()
// export class HandleActivityFromHK {
//     constructor(
//         @Inject(RepositoryType)
//         private readonly repositoryAdapter: Repository,
//         private readonly saveHealthData: SaveHealthData,
//     ) { }
//
//     @Transactional()
//     public async execute(request: HandleActivityFromHKDTO): Promise<void> {
//         const { userId, activity, healthData } = request;
//
//         await this.saveHealthData.execute({
//             userId,
//             ...healthData,
//         });
//
//         const providerData = await this.repositoryAdapter.getHealthProviderDataByDeviceId(userId);
//         if (!providerData) {
//             throw new BadRequestException('No such userID');
//         }
//
//         // await this.generateAfterWorkoutNotification.execute({
//         //     providerData,
//         //     calories: activity.calories,
//         // });
//     }
// }
