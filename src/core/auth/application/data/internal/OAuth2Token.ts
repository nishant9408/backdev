interface TokenBuilder {
    accessToken: string;
    accessTokenExpiresAt?: Date;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    scope?: string | string[];
    userId: number;
}

export class OAuth2Token {
    accessToken: string;
    accessTokenExpiresAt?: Date;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    scope?: string | string[];
    userId: number;

    static fromObject(builder: TokenBuilder): OAuth2Token {
        const token = new OAuth2Token();
        token.accessToken = builder.accessToken;
        token.refreshToken = builder.refreshToken;
        token.accessTokenExpiresAt = builder.accessTokenExpiresAt;
        token.refreshTokenExpiresAt = builder.refreshTokenExpiresAt;
        token.scope = builder.scope;
        token.userId = builder.userId;
        return token;
    }
}
