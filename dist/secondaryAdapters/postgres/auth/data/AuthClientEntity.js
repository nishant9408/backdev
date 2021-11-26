"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthClientEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClientEntity = void 0;
const typeorm_1 = require("typeorm");
let AuthClientEntity = AuthClientEntity_1 = class AuthClientEntity {
    static fromObject(builder) {
        const client = new AuthClientEntity_1();
        client.clientId = builder.clientId;
        client.clientSecret = builder.clientSecret;
        client.scope = builder.scope;
        client.grantTypes = builder.grantTypes;
        return client;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'client_id' }),
    __metadata("design:type", String)
], AuthClientEntity.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_secret' }),
    __metadata("design:type", String)
], AuthClientEntity.prototype, "clientSecret", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'scope' }),
    __metadata("design:type", Array)
], AuthClientEntity.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'grant_types' }),
    __metadata("design:type", Array)
], AuthClientEntity.prototype, "grantTypes", void 0);
AuthClientEntity = AuthClientEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'oauth_client' })
], AuthClientEntity);
exports.AuthClientEntity = AuthClientEntity;
//# sourceMappingURL=AuthClientEntity.js.map