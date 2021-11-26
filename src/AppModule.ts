import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RestModule } from './primaryAdapters/rest/RestModule';
import { PostgresConnectionModule } from './secondaryAdapters/postgres/common/PostgresConnectionModule';

@Module({
    imports: [
        PostgresConnectionModule,
        RestModule,
        ScheduleModule.forRoot(),
    ],
})
export class AppModule { }
