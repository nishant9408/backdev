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
exports.DeviceTable1591692674503 = void 0;
class DeviceTable1591692674503 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield queryRunner.query(addEnumType);
            yield queryRunner.query(createDeviceInformationTableSQL);
            yield queryRunner.query(createHealthTableSQL);
            yield queryRunner.query(createDeviceLocationSQL);
            yield queryRunner.query(createHealthProviderSQL);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.DeviceTable1591692674503 = DeviceTable1591692674503;
//# sourceMappingURL=1591692674503-DeviceTable.js.map