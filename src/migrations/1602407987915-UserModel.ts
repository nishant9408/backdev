import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserModel1602407987915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const genderEnum = `
        CREATE TYPE gender_enum AS ENUM ('male', 'female');`;

        const createUserTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            gender gender_enum DEFAULT NULL,
            age INTEGER NOT NULL,
            height INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            target_weight INTEGER NOT NULL,
            weight_loss_intensity INTEGER NOT NULL,
            health_condition VARCHAR(255) NOT NULL,
            region VARCHAR(255) NOT NULL,
            location_new VARCHAR(255) NOT NULL,
            food_intolerance text[] NOT NULL,
            diet VARCHAR(255) NOT NULL,
            foods text[] NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP DEFAULT NULL
          );`;

        await queryRunner.query(genderEnum);
        await queryRunner.query(createUserTableSQL);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
