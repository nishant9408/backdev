interface FoundMarketBuilder {
    latitude: number;
    longitude: number;
    link: string;
    userLocation: {
        latitude: number;
        longitude: number;
    };
}

export class FoundMarket {
    latitude: number;
    longitude: number;
    link: string;
    userLocation: {
        latitude: number;
        longitude: number;
    };

    public static fromObject(builder: FoundMarketBuilder): FoundMarket {
        const data = new FoundMarket();
        data.latitude = builder.latitude;
        data.longitude = builder.longitude;
        data.link = builder.link;
        data.userLocation = {
            latitude: builder.userLocation.latitude,
            longitude: builder.userLocation.longitude,
        };
        return data;
    }
}
