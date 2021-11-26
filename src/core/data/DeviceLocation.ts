export interface LocationBuilder {
    id?: string | null;
    userId: string;
    latitude: number;
    longitude: number;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}

export class DeviceLocation {
    id: string | null;
    userId: string;
    latitude: number;
    longitude: number;
    updatedAt: Date | null;
    createdAt: Date | null;

    public static fromObject(builder: LocationBuilder): DeviceLocation {
        const data = new DeviceLocation();
        data.id = builder.id || null;
        data.userId = builder.userId;
        data.latitude = builder.latitude;
        data.longitude = builder.longitude;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
