import { ApiProperty } from '@nestjs/swagger';

interface PointResponseBuilder {
    lat: number;
    lng: number;
}

export class PointResponse {
    @ApiProperty()
    lat: number;

    @ApiProperty()
    lng: number;

    public static fromObject(builder: PointResponseBuilder): PointResponse {
        const point = new PointResponse();
        point.lat = builder.lat;
        point.lng = builder.lng;
        return point;
    }
}
