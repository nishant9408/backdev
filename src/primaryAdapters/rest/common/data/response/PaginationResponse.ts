import { ApiProperty } from '@nestjs/swagger';

interface PaginationResponseBuilder {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export class PaginationResponse {
    @ApiProperty()
    page: number;

    @ApiProperty()
    pageSize: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    hasNext: boolean;

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
