import { HealthProviderName } from './HealthProviderName';

interface HealthProviderBuilder {
    id?: string | null;
    uId: number | null;
    name: HealthProviderName;
    timezone?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: number | null;
    scope?: string | null;
    userId?: string | null;
    tokenType?: string | null;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}

export class HealthProvider {
    id: string | null;
    uId: number | null;
    name: HealthProviderName;
    timezone: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    scope: string | null;
    userId: string | null;
    tokenType: string | null;
    updatedAt: Date | null;
    createdAt: Date | null;

    public static fromObject(builder: HealthProviderBuilder): HealthProvider {
        const data = new HealthProvider();
        data.id = builder.id || null;
        data.uId = builder.uId; // app user
        data.name = builder.name;
        data.timezone = builder.timezone || null;
        data.accessToken = builder.accessToken || null;
        data.refreshToken = builder.refreshToken || null;
        data.expiresIn = builder.expiresIn || null;
        data.scope = builder.scope || null;
        data.userId = builder.userId || null; // fitbit user id
        data.tokenType = builder.tokenType || null;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
