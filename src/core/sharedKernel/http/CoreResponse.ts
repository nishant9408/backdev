interface IntermediateResponseConstructionObject {
    headers?: { [key: string]: number | string | string[] | undefined; };
}

export class CoreResponse {
    body?: any;
    headers?: { [key: string]: number | string | string[] | undefined; };
    status?: number;

    public static fromObject(constrObject: IntermediateResponseConstructionObject) {
        const newRes = new CoreResponse();
        newRes.headers = constrObject.headers;
        return newRes;
    }
}
