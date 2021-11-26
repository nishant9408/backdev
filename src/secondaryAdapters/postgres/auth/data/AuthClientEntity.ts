import { Column, Entity, PrimaryColumn } from 'typeorm';

interface AuthClientEntityConstructionObject {
    clientId: string;
    clientSecret: string;
    grantTypes: string[];
    scope: string[];
}

@Entity({ name: 'oauth_client' })
export class AuthClientEntity {
    @PrimaryColumn({ name: 'client_id' })
    clientId: string;

    @Column({ name: 'client_secret' })
    clientSecret: string;

    @Column('simple-array', { name: 'scope' }) // , transformer: new CommaSeparatedStringToListValueTransformer()
    scope: string[];

    @Column('simple-array', { name: 'grant_types' })
    grantTypes: string[];

    public static fromObject(builder: AuthClientEntityConstructionObject): AuthClientEntity {
        const client = new AuthClientEntity();
        client.clientId = builder.clientId;
        client.clientSecret = builder.clientSecret;
        client.scope = builder.scope;
        client.grantTypes = builder.grantTypes;
        return client;
    }
}
