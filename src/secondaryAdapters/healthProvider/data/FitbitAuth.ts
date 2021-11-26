interface FitbitAuthBuilder {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    user_id: string;
}

export class FitbitAuth {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
    userId: string;

    public static fromObject(builder: FitbitAuthBuilder): FitbitAuth {
        const data = new FitbitAuth();
        data.accessToken = builder.access_token;
        data.expiresIn = builder.expires_in;
        data.refreshToken = builder.refresh_token;
        data.scope = builder.scope;
        data.tokenType = builder.token_type;
        data.userId = builder.user_id;
        return data;
    }
}
