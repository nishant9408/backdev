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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthServerAdapter = void 0;
const common_1 = require("@nestjs/common");
const OAuth2Server = require("oauth2-server");
const OAuthRequestMapper_1 = require("./mappers/OAuthRequestMapper");
const OAuthResponseMapper_1 = require("./mappers/OAuthResponseMapper");
const TokenMapper_1 = require("./mappers/TokenMapper");
const OAuthServerModel_1 = require("./OAuthServerModel");
let OAuthServerAdapter = class OAuthServerAdapter {
    constructor(oauth, oauthRequestMapper, oauthResponseMapper, tokenMapper) {
        this.oauth = oauth;
        this.oauthRequestMapper = oauthRequestMapper;
        this.oauthResponseMapper = oauthResponseMapper;
        this.tokenMapper = tokenMapper;
    }
    getToken(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.oauth.token(this.oauthRequestMapper.map(request), this.oauthResponseMapper.map(response));
            return this.tokenMapper.map(token);
        });
    }
};
OAuthServerAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(OAuthServerModel_1.OAuth2ServerType)),
    __param(1, (0, common_1.Inject)(OAuthRequestMapper_1.OAuthRequestMapperType)),
    __param(2, (0, common_1.Inject)(OAuthResponseMapper_1.OAuthResponseMapperType)),
    __param(3, (0, common_1.Inject)(TokenMapper_1.TokenMapperType)),
    __metadata("design:paramtypes", [typeof (_a = typeof OAuth2Server !== "undefined" && OAuth2Server) === "function" ? _a : Object, OAuthRequestMapper_1.OAuthRequestMapper,
        OAuthResponseMapper_1.OAuthResponseMapper,
        TokenMapper_1.TokenMapper])
], OAuthServerAdapter);
exports.OAuthServerAdapter = OAuthServerAdapter;
//# sourceMappingURL=OAuthServerAdapter.js.map