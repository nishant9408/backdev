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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPush = void 0;
const common_1 = require("@nestjs/common");
const Notification_1 = require("../data/Notification");
const NotificationType_1 = require("../data/NotificationType");
const NotificationService_1 = require("../ports/NotificationService");
const Repository_1 = require("../ports/Repository");
let SendPush = class SendPush {
    constructor(notificationServiceAdapter, repositoryAdapter) {
        this.notificationServiceAdapter = notificationServiceAdapter;
        this.repositoryAdapter = repositoryAdapter;
    }
    execute(userId, token, notificationType) {
        return __awaiter(this, void 0, void 0, function* () {
            let notificationToken = token;
            const provider = yield this.repositoryAdapter.findDeviceData(userId);
            if (!provider)
                throw new common_1.NotFoundException('device not found');
            if (!notificationToken) {
                if (!provider.notificationToken)
                    throw new common_1.NotFoundException('token not found');
                notificationToken = provider.notificationToken;
            }
            const notification = Notification_1.Notification.fromObject({
                body: 'Recharge your energy with 300ml of plant-based milk with 2 fruits',
                title: '🥇Great training, keep going!',
                data: {
                    storeLon: '30.465078',
                    storeLat: '50.519695',
                    userLat: '30.46507',
                    userLon: '50.519696',
                    link: 'https://megamarket.ua',
                    notificationType: notificationType || NotificationType_1.NotificationType.DAILY,
                },
                token: notificationToken,
            });
            yield this.notificationServiceAdapter.send(notification);
        });
    }
};
SendPush = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(NotificationService_1.NotificationServiceType)),
    __param(1, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object, Object])
], SendPush);
exports.SendPush = SendPush;
//# sourceMappingURL=SendPush.js.map