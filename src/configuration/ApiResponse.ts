export interface ApiError {
    message: string | { [key: string]: string };
}

export class ApiResponse {
    public data: any;
    public errors: ApiError[];

    static fromObject(data: any, errors: ApiError[] = []): ApiResponse {
        const response = new ApiResponse();
        response.errors = errors;
        response.data = data || null;
        return response;
    }
}
