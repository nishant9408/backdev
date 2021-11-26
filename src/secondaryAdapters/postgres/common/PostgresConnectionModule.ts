import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfiguration from './postgresConfiguration';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: postgresConfiguration,
        }),
    ],
    exports: [ TypeOrmModule ],
})
export class PostgresConnectionModule { }
