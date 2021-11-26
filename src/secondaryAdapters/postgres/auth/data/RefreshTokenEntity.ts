import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SQLBigIntToNumberValueTransformer } from '../../common/transformers';

interface RefreshTokenEntityConstructionObject {
    refreshToken: string;
    clientId: string;
    scope: string[];
    userId: number;
    expires: Date;
    isActive?: boolean;
}

@Entity({ name: 'oauth_refresh_token' })
export class RefreshTokenEntity {
    @PrimaryColumn({ name: 'refresh_token' })
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

    public static fromObject(builder: RefreshTokenEntityConstructionObject): RefreshTokenEntity {
        const newToken = new RefreshTokenEntity();
        newToken.refreshToken = builder.refreshToken;
        newToken.clientId = builder.clientId;
        newToken.scope = builder.scope;
        newToken.userId = builder.userId;
        newToken.expires = builder.expires;
        newToken.isActive = builder.isActive;
        return newToken;
    }
}
