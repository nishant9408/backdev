import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

interface PaginationResponseBuilder {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export class PaginationResponse {
    @IsNumber()
    @ApiProperty()
    page: number;

    @IsNumber()
    @ApiProperty()
    pageSize: number;

    @IsNumber()
    @ApiProperty()
    totalPages: number;

    @IsBoolean()
    @ApiProperty()
    hasNext: boolean;

    @IsBoolean()
    @ApiProperty()
    hasPrev: boolean;

    public static fromObject(builder: PaginationResponseBuilder): PaginationResponse {
        const pagination = new PaginationResponse();
        pagination.page = builder.page;
        pagination.pageSize = builder.pageSize;
        pagination.totalPages = builder.totalPages;
        pagination.hasNext = builder.hasNext;
        pagination.hasPrev = builder.hasPrev;
        return pagination;
    }
}
