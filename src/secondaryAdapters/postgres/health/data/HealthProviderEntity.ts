import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { HealthProviderName } from '../../../../core/data/HealthProviderName';
import { SQLBigIntToNumberValueTransformer } from '../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer';
import { wrapNullable } from '../../../../core/sharedKernel/wrapNullable';

interface HealthProviderEntityBuilder {
    id?: string | null;
    uId: number | null;
    name: HealthProviderName;
    timezone: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    scope: string | null;
    userId: string | null;
    tokenType: string | null;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}

@Entity({ name: 'health_provider' })
export class HealthProviderEntity {
    @PrimaryColumn({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer(),
    })
    id!: string;

    @Column({ name: 'name', type: 'enum', enum: HealthProviderName })
    name: HealthProviderName;

    @Column({ name: 'access_token', nullable: true })
    accessToken: string;

    @Column({ name: 'refresh_token', nullable: true })
    refreshToken: string;

    @Column({ name: 'timezone', nullable: true })
    timezone: string;

    @Column({ name: 'u_id' })
    uId!: number;

    @Column({ name: 'user_id', nullable: true })
    userId: string;

    @Column({ name: 'scope', nullable: true })
    scope: string;

    @Column({ name: 'token_type', nullable: true })
    tokenType: string;

    @Column({ name: 'expires_in', nullable: true })
    expiresIn: number;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    static fromObject(builder: HealthProviderEntityBuilder): HealthProviderEntity {
        const data = new HealthProviderEntity();
        data.id = wrapNullable(builder.id);
        data.uId = wrapNullable(builder.uId);
        data.name = builder.name;
        data.timezone = wrapNullable(builder.timezone);
        data.accessToken = wrapNullable(builder.accessToken);
        data.refreshToken = wrapNullable(builder.refreshToken);
        data.userId = wrapNullable(builder.userId);
        data.scope = wrapNullable(builder.scope);
        data.tokenType = wrapNullable(builder.tokenType);
        data.expiresIn = wrapNullable(builder.expiresIn);
        data.updatedAt = new Date();
        if (builder.createdAt != null) {
            data.createdAt = builder.createdAt;
        }
        return data;
    }
}
