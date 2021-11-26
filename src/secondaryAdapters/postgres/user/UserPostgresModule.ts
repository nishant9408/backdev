import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepositoryType } from '../../../core/user/port/UserRepository';
import { UserEntityConverter, UserEntityConverterType } from './converters/UserEntityConverter';
import { UserEntity } from './data/UserEntity';
import { UserRepositoryAdapter } from './repository/UserRepositoryAdapter';

@Module({
      imports: [ TypeOrmModule.forFeature([
          UserEntity,
      ]) ],
      providers: [
          {
              provide: UserEntityConverterType,
              useClass: UserEntityConverter,
          }, {
              provide: UserRepositoryType,
              useClass: UserRepositoryAdapter,
          },
      ],
      exports: [
          UserRepositoryType,
          UserEntityConverterType,
      ],
})
export class UserPostgresModule {
}
