import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export interface CurrentUserOptions {
    required?: boolean;
}

export const CurrentUser: (options?: CurrentUserOptions) => ParameterDecorator =
    createParamDecorator((options: CurrentUserOptions = { }, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        if (options.required && !req.user) {
            throw new UnauthorizedException();
        }
        return req.user;
    });
