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
exports.ProvideDailyScore = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
require("moment-timezone");
const Repository_1 = require("../ports/Repository");
const UserRepository_1 = require("../user/port/UserRepository");
let ProvideDailyScore = class ProvideDailyScore {
    constructor(repositoryAdapter, userRepository) {
        this.repositoryAdapter = repositoryAdapter;
        this.userRepository = userRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user, dailyScores] = yield Promise.all([
                this.userRepository.findById(request.userId),
                this.repositoryAdapter.getTwoDailyScoreByUserId(request.userId),
            ]);
            if (!dailyScores.length)
                return null;
            if (dailyScores.length === 1)
                return dailyScores[0];
            if (!user)
                return dailyScores[0];
            const { timezone } = user;
            const date = moment.tz(new Date(), timezone);
            return date.hours() < 11 ? dailyScores[1] : dailyScores[0];
        });
    }
};
ProvideDailyScore = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(Repository_1.RepositoryType)),
    __param(1, (0, common_1.Inject)(UserRepository_1.UserRepositoryType)),
    __metadata("design:paramtypes", [Object, Object])
], ProvideDailyScore);
exports.ProvideDailyScore = ProvideDailyScore;
//# sourceMappingURL=ProvideDailyScore.js.map