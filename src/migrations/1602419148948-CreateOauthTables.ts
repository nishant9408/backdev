import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOauthTables1602419148948 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const accessTokenTableQuery = `
        CREATE TABLE IF NOT EXISTS oauth_access_token (
            access_token VARCHAR(256) PRIMARY KEY,
            client_id VARCHAR(256) NOT NULL,
            scope VARCHAR(256) NOT NULL,
            user_id BIGINT NOT NULL,
            refresh_token VARCHAR(256) NOT NULL,
            expires TIMESTAMP NOT NULL,
            is_active BOOLEAN DEFAULT TRUE
        );
        `;

        const clientsTableQuery = `
        CREATE TABLE IF NOT EXISTS oauth_client (
            client_id VARCHAR(256) PRIMARY KEY,
            client_secret VARCHAR(256) NOT NULL,
            scope VARCHAR(256) NOT NULL,
            grant_types varchar(256)
        );
        `;

        const refreshTokenTableQuery = `
        CREATE TABLE IF NOT EXISTS oauth_refresh_token (
            refresh_token VARCHAR(256) PRIMARY KEY,
            client_id VARCHAR(256) NOT NULL,
            scope VARCHAR(256) NOT NULL,
            user_id BIGINT NOT NULL,
            expires TIMESTAMP NOT NULL,
            is_active BOOLEAN DEFAULT TRUE
        );
        `;

        const insertDefaultClients = `
        INSERT INTO oauth_client (client_id, client_secret, scope, grant_types)
        VALUES
        ('web', 'web-client', 'basic', 'password,refresh_token');
        `;

        await Promise.all([
            queryRunner.query(accessTokenTableQuery),
            queryRunner.query(clientsTableQuery),
            queryRunner.query(refreshTokenTableQuery),
        ]);
        await queryRunner.query(insertDefaultClients);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
