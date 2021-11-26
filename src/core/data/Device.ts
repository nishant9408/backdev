export interface DeviceBuilder {
    userId: string;
    notificationToken?: string | null;
    timezone: string;
    allowMailing: boolean;
    email?: string | null;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}

export class Device {
    userId: string;
    notificationToken: string | null;
    timezone: string;
    allowMailing: boolean;
    email: string | null;
    updatedAt: Date | null;
    createdAt: Date | null;

    public static fromObject(builder: DeviceBuilder): Device {
        const data = new Device();
        data.userId = builder.userId;
        data.timezone = builder.timezone;
        data.allowMailing = builder.allowMailing;
        data.email = builder.email || null;
        data.notificationToken = builder.notificationToken || null;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
