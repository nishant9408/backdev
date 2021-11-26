import { HealthProviderName } from '../data/HealthProviderName';

export interface HealthProviderDataDTO {
    id?: string | null;
    name: HealthProviderName;
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: number | null;
    scope?: string | null;
    userId?: string | null;
    tokenType?: string | null;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}
