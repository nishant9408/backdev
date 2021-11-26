interface PointBuilder {
    latitude: number;
    longitude: number;
}

export class Point {
    latitude: number;
    longitude: number;

    public static fromObject(builder: PointBuilder): Point {
        const data = new Point();
        data.latitude = builder.latitude;
        data.longitude = builder.longitude;
        return data;
    }
}
