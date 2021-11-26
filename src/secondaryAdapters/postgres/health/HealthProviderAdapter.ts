import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthProvider } from '../../../core/data/HealthProvider';
import { HealthProviderName } from '../../../core/data/HealthProviderName';
import { HealthProviderRepository } from '../../../core/ports/HealthProviderRepository';
import { HealthProviderEntity } from './data/HealthProviderEntity';

@Injectable()
export class HealthProviderAdapter implements HealthProviderRepository {
    constructor(
        @InjectRepository(HealthProviderEntity)
        private readonly healthProviderRepository: Repository<HealthProviderEntity>,
    ) { }

    public async getHealthProviderDataByUserId(userId: number): Promise<HealthProvider | null> {
        const entity = await this.healthProviderRepository.findOne({ uId: userId });
        return entity ? HealthProvider.fromObject(entity) : null;
    }

    public async saveHealthProviderData(data: HealthProvider): Promise<HealthProvider> {
        const entityToSave = HealthProviderEntity.fromObject(data);
        const entity = await this.healthProviderRepository.save(entityToSave);
        return HealthProvider.fromObject(entity);
    }

    public async getHealthKitProviders(): Promise<HealthProvider[]> {
        const entities = await this.healthProviderRepository.find({ name: HealthProviderName.HEALTH_KIT });
        return entities.map(entity => HealthProvider.fromObject(entity));
    }

    public async getFitbitProviders(): Promise<HealthProvider[]> {
        const entities = await this.healthProviderRepository.find({ name: HealthProviderName.FITBIT });
        return entities.map(entity => HealthProvider.fromObject(entity));
    }
}
