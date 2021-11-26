import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CoreResponse } from '../../../../core/sharedKernel/http/CoreResponse';
import { Mapper } from '../../../../core/sharedKernel/interfaces/Mapper';

@Injectable()
export class ExpressResponseMapper implements Mapper<Response, CoreResponse> {
    map(from: Response): CoreResponse {
        return CoreResponse.fromObject({
            headers: { ...from.getHeaders() },
        });
    }
}

const ExpressResponseMapperType = Symbol.for('ExpressResponseMapper');
export { ExpressResponseMapperType };
