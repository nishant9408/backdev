export class Rethrow {
    private readonly func: () => Promise<any>;

    private constructor(func: () => Promise<any>) {
        this.func = func;
    }

    public static of(func: () => Promise<any>) {
        return new Rethrow(func);
    }

    public async execOrThrow(throwFunc: (e: Error) => Error): Promise<any> {
        try {
            return await this.func();
        } catch (caughtError) {
            throw throwFunc(caughtError);
        }
    }
}
