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
var InviteTokenEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteTokenEntity = void 0;
const typeorm_1 = require("typeorm");
const transformers_1 = require("../../common/transformers");
const utils_1 = require("../../common/utils");
const UserEntity_1 = require("../../user/data/UserEntity");
let InviteTokenEntity = InviteTokenEntity_1 = class InviteTokenEntity {
    constructor() {
        this.isUsed = false;
        this.createdAt = new Date();
    }
    static fromObject(builder) {
        const newToken = new InviteTokenEntity_1();
        newToken.id = (0, utils_1.wrapNullable)(builder.id);
        newToken.token = builder.token;
        newToken.user = builder.user;
        newToken.userId = builder.userId;
        newToken.isUsed = builder.isUsed;
        if (builder.createdAt != null) {
            newToken.createdAt = builder.createdAt;
        }
        return newToken;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'id',
        generated: true,
        transformer: new transformers_1.SQLBigIntToNumberValueTransformer(),
    }),
    __metadata("design:type", Number)
], InviteTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token' }),
    __metadata("design:type", String)
], InviteTokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', transformer: new transformers_1.SQLBigIntToNumberValueTransformer() }),
    __metadata("design:type", Number)
], InviteTokenEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_used' }),
    __metadata("design:type", Boolean)
], InviteTokenEntity.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => UserEntity_1.UserEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", UserEntity_1.UserEntity)
], InviteTokenEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Date)
], InviteTokenEntity.prototype, "createdAt", void 0);
InviteTokenEntity = InviteTokenEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'invite_token' })
], InviteTokenEntity);
exports.InviteTokenEntity = InviteTokenEntity;
//# sourceMappingURL=InviteTokenEntity.js.map