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
exports.SaveSamsungSubscriber = void 0;
const common_1 = require("@nestjs/common");
const Logger_1 = require("../../configuration/Logger");
const SamsungSubscriber_1 = require("../data/SamsungSubscriber");
const Repository_1 = require("../ports/Repository");
let SaveSamsungSubscriber = class SaveSamsungSubscriber {
    constructor(repositoryAdapter) {
        this.repositoryAdapter = repositoryAdapter;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriber = yield this.repositoryAdapter.findSamsungSubscriber(data.email);
            if (subscriber) {
                Logger_1.default.info({ id: subscriber.id, email: subscriber.email }, 'Samsung subscriber already exists');
                return;
            }
            const savedSubscriber = yield this.repositoryAdapter.saveSamsungSubscriber(SamsungSubscriber_1.SamsungSubscriber.fromObject(data));
            Logger_1.default.info({ id: savedSubscriber.id, email: savedSubscriber.email }, 'Samsung subscriber saved');
        });
    }
};
SaveSamsungSubscriber = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __metadata("design:paramtypes", [Object])
], SaveSamsungSubscriber);
exports.SaveSamsungSubscriber = SaveSamsungSubscriber;
//# sourceMappingURL=SaveSamsungSubscriber.js.map