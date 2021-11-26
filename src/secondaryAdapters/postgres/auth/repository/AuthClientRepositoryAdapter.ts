import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthClientRepository } from '../../../../core/auth/port/AuthClientRepository';
import { AuthClientEntity } from '../data/AuthClientEntity';

@Injectable()
export class AuthClientRepositoryAdapter implements AuthClientRepository {
    constructor(
        @InjectRepository(AuthClientEntity)
        private readonly repository: Repository<AuthClientEntity>,
    ) { }

    public async findById(clientId: string): Promise<AuthClientEntity | null> {
        const client = await this.repository.findOne({ where: { clientId }, cache: true });
        return client || null;
    }

    public async findByIdAndSecret(clientId: string, clientSecret: string): Promise<AuthClientEntity | null> {
        const client = await this.repository.findOne({ where: { clientId, clientSecret }, cache: true });
        return client || null;
    }

    public async findByAccessToken(accessToken: string): Promise<AuthClientEntity | null> {
        const client = await this.repository.findOne({ where: { accessToken }, cache: true });
        return client || null;
    }
}
