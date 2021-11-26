"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((options = {}, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (options.required && !req.user) {
        throw new common_1.UnauthorizedException();
    }
    return req.user;
});
//# sourceMappingURL=CurrentUser.js.map