import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './ApiResponse';

export class ResultInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = next.handle();
        return handler.pipe(
            map((data: any) =>
                ApiResponse.fromObject(data)),
        );
    }
}
