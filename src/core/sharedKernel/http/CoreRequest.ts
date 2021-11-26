interface CoreRequestBuilder {
    body?: any;
    headers?: { [key: string]: string | string[] | undefined; };
    method?: string;
    query?: { [key: string]: string; };
}

export class CoreRequest {
    body: any;
    headers: { [key: string]: string | string[] | undefined; };
    method?: string;
    query: { [key: string]: string; };

    public static fromObject(constrObject: CoreRequestBuilder) {
        const newReq = new CoreRequest();
        newReq.body = constrObject.body || { };
        newReq.headers = constrObject.headers || { };
        newReq.query = constrObject.query || { };
        newReq.method = constrObject.method;
        return newReq;
    }
}
