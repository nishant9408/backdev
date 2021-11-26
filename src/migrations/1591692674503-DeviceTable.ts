import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeviceTable1591692674503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const addEnumType = `
            CREATE TYPE health_provider_name AS ENUM ('health-kit', 'fitbit', 'samsung');`;

        const createHealthTableSQL = `
        CREATE TABLE health (
            id BIGSERIAL PRIMARY KEY,
            device_id VARCHAR(255),
            data JSONB NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW(),
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (device_id) REFERENCES device(device_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
        );`;

        const createDeviceLocationSQL = `
        CREATE TABLE location (
            id BIGSERIAL PRIMARY KEY,
            device_id VARCHAR(255),
            latitude DOUBLE PRECISION DEFAULT NULL,
            longitude DOUBLE PRECISION DEFAULT NULL,
            updated_at TIMESTAMP DEFAULT NOW(),
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (device_id) REFERENCES device(device_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
        );`;

        const createHealthProviderSQL = `
        CREATE TABLE health_provider (
            id BIGSERIAL PRIMARY KEY,
            device_id VARCHAR(255),
            name health_provider_name DEFAULT NULL,
            access_token TEXT DEFAULT NULL,
            refresh_token VARCHAR(255) DEFAULT NULL,
            user_id VARCHAR(255) DEFAULT NULL,
            scope VARCHAR(255) DEFAULT NULL,
            token_type VARCHAR(255) DEFAULT NULL,
            expires_in INTEGER DEFAULT NULL,
            updated_at TIMESTAMP DEFAULT NOW(),
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (device_id) REFERENCES device(device_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
        );`;

        const createDeviceInformationTableSQL = `
        CREATE TABLE device (
            device_id VARCHAR(255) PRIMARY KEY NOT NULL,
            notification_token VARCHAR(255) NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW(),
            created_at TIMESTAMP DEFAULT NOW()
        );`;

        await queryRunner.query(addEnumType);
        await queryRunner.query(createDeviceInformationTableSQL);
        await queryRunner.query(createHealthTableSQL);
        await queryRunner.query(createDeviceLocationSQL);
        await queryRunner.query(createHealthProviderSQL);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
