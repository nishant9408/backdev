interface SocialNetworkResponseBuilder {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

export class SocialNetworkResponse {
    id: string;
    name: string;
    email: string;
    picture?: string;

    public static fromObject(builder: SocialNetworkResponseBuilder): SocialNetworkResponse {
        const response = new SocialNetworkResponse();
        response.id = builder.id;
        response.name = builder.name;
        response.email = builder.email;
        response.picture = builder.picture;
        return response;
    }
}
