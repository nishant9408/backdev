interface AuthUserBuilder {
    accessToken: string;
    userId: number;
}

export class AuthUser {
    accessToken: string;
    userId: number;

    public static fromObject(builder: AuthUserBuilder): AuthUser {
        const newUser = new AuthUser();
        newUser.accessToken = builder.accessToken;
        newUser.userId = builder.userId;
        return newUser;
    }
}
