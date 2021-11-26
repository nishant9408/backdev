import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SQLBigIntToNumberValueTransformer } from '../../common/transformers';

interface AccessTokenEntityBuilder {
    accessToken: string;
    refreshToken: string;
    clientId: string;
    scope: string[];
    userId: number;
    expires: Date;
    isActive?: boolean;
}

@Entity({ name: 'oauth_access_token' })
export class AccessTokenEntity {
    @PrimaryColumn({ name: 'access_token' })
    accessToken: string;

    @Column({ name: 'refresh_token' })
    refreshToken: string;

    @Column({ name: 'client_id' })
    clientId: string;

    @Column('simple-array', { name: 'scope' })
    scope: string[];

    @Column({ name: 'user_id', transformer: new SQLBigIntToNumberValueTransformer() })
    userId: number;

    @Column({ name: 'expires' })
    expires: Date;

    @Column({ name: 'is_active' })
    isActive?: boolean;

    public static fromObject(builder: AccessTokenEntityBuilder): AccessTokenEntity {
        const newToken = new AccessTokenEntity();
        newToken.accessToken = builder.accessToken;
        newToken.refreshToken = builder.refreshToken;
        newToken.clientId = builder.clientId;
        newToken.scope = builder.scope;
        newToken.userId = builder.userId;
        newToken.expires = builder.expires;
        newToken.isActive = builder.isActive;
        return newToken;
    }
}
