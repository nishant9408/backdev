"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialNetworkResponse = void 0;
class SocialNetworkResponse {
    static fromObject(builder) {
        const response = new SocialNetworkResponse();
        response.id = builder.id;
        response.name = builder.name;
        response.email = builder.email;
        response.picture = builder.picture;
        return response;
    }
}
exports.SocialNetworkResponse = SocialNetworkResponse;
//# sourceMappingURL=SocialNetworkResponse.js.map