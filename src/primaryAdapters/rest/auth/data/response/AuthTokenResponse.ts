import { ApiProperty } from '@nestjs/swagger';

interface AuthTokenResponseConstructionObject {
    accessToken: string;
    refreshToken: string;
}

export class AuthTokenResponse {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    public static fromObject(constrObject: AuthTokenResponseConstructionObject): AuthTokenResponse {
        const newToken = new AuthTokenResponse();
        newToken.accessToken = constrObject.accessToken;
        newToken.refreshToken = constrObject.refreshToken;
        return newToken;
    }
}
