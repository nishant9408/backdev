import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenRepository } from '../../../../core/auth/port/RefreshTokenRepository';
import { RefreshTokenEntity } from '../data/RefreshTokenEntity';

@Injectable()
export class RefreshTokenRepositoryAdapter implements RefreshTokenRepository {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private readonly repository: Repository<RefreshTokenEntity>,
    ) { }

    public async findRefreshTokenData(refreshToken: string): Promise<RefreshTokenEntity | null> {
        const refreshTokenData = await this.repository.findOne({ where: { refreshToken }, cache: true });
        return refreshTokenData || null;
    }

    public async findRefreshTokenListByUserId(userId: number): Promise<RefreshTokenEntity[]> {
        return await this.repository.find({ where: { userId, isActive: true }, cache: true });
    }

    public async save(refreshTokenData: RefreshTokenEntity): Promise<RefreshTokenEntity> {
        return await this.repository.save(refreshTokenData);
    }

    public async saveList(accessTokensList: RefreshTokenEntity[]): Promise<RefreshTokenEntity[]> {
        return await this.repository.save(accessTokensList);
    }
}
