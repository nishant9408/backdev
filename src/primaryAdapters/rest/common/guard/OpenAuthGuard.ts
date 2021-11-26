import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class OpenAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const authorizationValue = request.headers['open-auth'];
        // if (!authorizationValue) {
        //     throw new UnauthorizedException('Invalid token');
        // }

        return true;
    }
}
