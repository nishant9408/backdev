import { ForbiddenException } from '@nestjs/common';

export class CheckPermissions {
    private readonly func: () => boolean;

    private constructor(checkFunc: () => boolean) {
        this.func = checkFunc;
    }

    public static of(checkFunc: () => boolean) {
        return new CheckPermissions(checkFunc);
    }

    public throwOnFailure(errorMessage: string = 'Action is not allowed'): void {
        if (!this.func()) {
            throw new ForbiddenException(errorMessage);
        }
    }
}
