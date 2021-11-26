"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOauthTables1602419148948 = void 0;
class CreateOauthTables1602419148948 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield Promise.all([
                queryRunner.query(accessTokenTableQuery),
                queryRunner.query(clientsTableQuery),
                queryRunner.query(refreshTokenTableQuery),
            ]);
            yield queryRunner.query(insertDefaultClients);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateOauthTables1602419148948 = CreateOauthTables1602419148948;
//# sourceMappingURL=1602419148948-CreateOauthTables.js.map