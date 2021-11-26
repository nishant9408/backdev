export interface SamsungSubscriberBuilder {
    id?: string | null;
    email: string;
    createdAt?: Date | null;
}

export class SamsungSubscriber {
    id: string | null;
    email: string;
    createdAt: Date | null;

    public static fromObject(builder: SamsungSubscriberBuilder): SamsungSubscriber {
        const data = new SamsungSubscriber();
        data.id = builder.id || null;
        data.email = builder.email;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
