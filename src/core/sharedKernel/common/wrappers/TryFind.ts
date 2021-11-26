import { NotFoundException } from '@nestjs/common';

export class TryFind<T> {
    private readonly func: () => Promise<T | null>;

    private constructor(findingFunc: () => Promise<T | null>) {
        this.func = findingFunc;
    }

    public static of<T>(findingFunc: () => Promise<T | null>) {
        return new TryFind<T>(findingFunc);
    }

    public async getOrThrow(errorMessage: string = 'Not found'): Promise<T> {
        const res = await this.func();
        if (!res) {
            throw new NotFoundException(errorMessage);
        }
        return res;
    }

    public async handleResult<R>(handler: (T) => R): Promise<R> {
        const res = await this.func();
        return handler(res);
    }

    public async throwOnResult(error: Error): Promise<void> {
        const res = await this.func();
        if (res) {
            throw error;
        }
    }
}
