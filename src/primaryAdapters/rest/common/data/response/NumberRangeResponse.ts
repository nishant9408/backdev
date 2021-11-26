import { ApiProperty } from '@nestjs/swagger';

interface NumberRangeResponseBuilder {
    min: number;
    max: number;
}

export class NumberRangeResponse {

    @ApiProperty()
    min: number;

    @ApiProperty()
    max: number;

    public static fromObject(builder: NumberRangeResponseBuilder): NumberRangeResponse {
        const response = new NumberRangeResponse();
        response.min = builder.min;
        response.max = builder.max;
        return response;
    }
}
