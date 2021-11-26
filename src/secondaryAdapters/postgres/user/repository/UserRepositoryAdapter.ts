import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Converter } from '../../../../core/sharedKernel/interfaces/Converter';

import { User } from '../../../../core/user/domain/data/User';
import { UserRepository } from '../../../../core/user/port/UserRepository';
import { UserEntityConverterType } from '../converters/UserEntityConverter';
import { UserEntity } from '../data/UserEntity';

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        @Inject(UserEntityConverterType)
        private readonly converter: Converter<User, UserEntity>,
    ) { }

    public async findById(id: number): Promise<User | null> {
        const entity = await this.repository.findOne({ id }, { cache: true });
        return entity ? this.converter.to(entity) : null;
    }

    public async findNotifiable(): Promise<User[]> {
        return await this.repository.find({ notificationToken: Not('') });
    }

    public async findByEmail(email: string): Promise<User | null> {
        const entity = await this.repository.findOne({ email });
        return entity ? this.converter.to(entity) : null;
    }

    public async save(user: User): Promise<User> {
        const entity = this.converter.from(user);
        const savedEntity = await this.repository.save(entity);
        return this.converter.to(savedEntity);
    }

    public async findByNotificationToken(notificationToken: string): Promise<User[]> {
        const entities = await this.repository.find({ notificationToken });
        return entities.map(entity => this.converter.to(entity));
    }
}
