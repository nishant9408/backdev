import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccessTokenRepository } from '../../../../core/auth/port/AccessTokenRepository';
import { AccessTokenEntity } from '../data/AccessTokenEntity';

@Injectable()
export class AccessTokenRepositoryAdapter implements AccessTokenRepository {
    constructor(
        @InjectRepository(AccessTokenEntity)
        private readonly repository: Repository<AccessTokenEntity>,
    ) { }

    public async findAccessTokenData(accessToken: string): Promise<AccessTokenEntity | null> {
        const accessTokenData = await this.repository.findOne({ where: { accessToken }, cache: true });
        return accessTokenData || null;
    }

    public async findAccessTokenListByUserId(userId: number): Promise<AccessTokenEntity[]> {
        return await this.repository.find({ where: { userId, isActive: true }, cache: true });
    }

    public async findAccessTokenByRefreshToken(refreshToken: string): Promise<AccessTokenEntity | null> {
        const accessTokenData = await this.repository.findOne({ where: { refreshToken }, cache: true });
        return accessTokenData || null;
    }

    public async save(accessTokenData: AccessTokenEntity): Promise<AccessTokenEntity> {
        return await this.repository.save(accessTokenData);
    }

    public async saveList(accessTokensList: AccessTokenEntity[]): Promise<AccessTokenEntity[]> {
        return await this.repository.save(accessTokensList);
    }
}
