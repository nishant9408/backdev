interface SilentIntervalBuilder {
    name: string;
}

export class SilentInterval {
    private static readonly prefix = 'silent-push';

    name: string;

    public static fromObject(builder: SilentIntervalBuilder): SilentInterval {
        const data = new SilentInterval();
        data.name = `${builder.name}:${SilentInterval.prefix}`;
        return data;
    }
}
