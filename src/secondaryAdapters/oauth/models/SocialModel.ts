import * as OAuth2 from 'oauth2-server';

export interface SocialModel<T> {
    createUser(userData: T): Promise<OAuth2.User>;

    getUserByEmail(email: string): Promise<OAuth2.User | null>;
}
