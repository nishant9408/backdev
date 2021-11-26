import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { CoreRequest } from '../../../../core/sharedKernel/http/CoreRequest';
import { Mapper } from '../../../../core/sharedKernel/interfaces/Mapper';

@Injectable()
export class ExpressRequestMapper implements Mapper<Request, CoreRequest> {
    map(from: Request): CoreRequest {
        return CoreRequest.fromObject({
            body: from.body,
            headers: from.headers,
            method: from.method,
            // query: from.query,
        });
    }
}

const ExpressRequestMapperType = Symbol.for('ExpressRequestMapper');
export { ExpressRequestMapperType };
