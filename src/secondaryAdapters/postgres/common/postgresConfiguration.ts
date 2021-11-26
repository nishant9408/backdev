import { join } from 'path';
import { getConnectionOptions } from 'typeorm';

export default async () => {
    const options = await getConnectionOptions();
    return {
        ...options,
        synchronize: false,
        logging: true,
        entities: [ join(__dirname, '../**/*Entity{.ts,.js}') ],
        migrations: [ join(__dirname, '../../../migrations/*{.ts,.js}') ],
        migrationsRun: true,
    };
};
