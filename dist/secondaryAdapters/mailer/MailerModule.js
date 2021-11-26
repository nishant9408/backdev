"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerModule = void 0;
const common_1 = require("@nestjs/common");
const MailerProvider_1 = require("../../core/ports/MailerProvider");
const MailerAdapter_1 = require("./MailerAdapter");
let MailerModule = class MailerModule {
};
MailerModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: MailerProvider_1.MailerProviderType,
                useClass: MailerAdapter_1.MailerAdapter,
            },
        ],
        exports: [
            MailerProvider_1.MailerProviderType,
        ],
    })
], MailerModule);
exports.MailerModule = MailerModule;
//# sourceMappingURL=MailerModule.js.map