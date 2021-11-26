import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import logger from '../../configuration/Logger';
import { Health } from '../data/Health';
import { SaveHealthDataDTO } from '../DTO/SaveHealthDataDTO';
import { Repository, RepositoryType } from '../ports/Repository';

@Injectable()
export class SaveHealthData {
    constructor(
        @Inject(RepositoryType)
        private readonly repositoryAdapter: Repository,
    ) { }

    public async execute(request: SaveHealthDataDTO): Promise<Health> {
        const { dateOfBirth, gender, email } = request;

        const prevHealthData = await this.repositoryAdapter.findHealthData(request.userId);

        let healthDataToSave;
        if (prevHealthData) {
            healthDataToSave = Health.fromObject({
                ...prevHealthData,
                ...request,
                dateOfBirth: dateOfBirth || prevHealthData.dateOfBirth,
                gender: gender || prevHealthData.gender,
                id: prevHealthData.id,
            });

        } else {
            const errors: string[]  = [];
            if (!gender) errors.push('gender required');
            if (!dateOfBirth) errors.push('dateOfBirth required');
            if (!email) errors.push('email required');

            if (errors.length) throw new BadRequestException(errors);

            healthDataToSave = Health.fromObject({
                ...request,
                gender: gender!,
                dateOfBirth: dateOfBirth!,
            });
        }

        const healthData = await this.repositoryAdapter.saveHealthData(healthDataToSave);

        logger.info({ id: healthData.id }, 'Saved');

        return healthData;
    }
}
