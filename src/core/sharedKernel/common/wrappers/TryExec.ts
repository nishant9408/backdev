import { InternalServerErrorException } from '@nestjs/common';

export class TryExec<T> {
    private readonly func: () => Promise<T | null>;

    private constructor(findingFunc: () => Promise<T | null>) {
        this.func = findingFunc;
    }

    public static of<T>(findingFunc: () => Promise<T | null>) {
        return new TryExec<T>(findingFunc);
    }

    public async getOrThrow(errorMessage: string = 'Internal server exception'): Promise<T> {
        const res = await this.func();
        if (!res) {
            throw new InternalServerErrorException(errorMessage);
        }
        return res;
    }
}
