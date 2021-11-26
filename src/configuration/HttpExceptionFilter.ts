import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { OptionsJson } from 'body-parser';
import { ApiError, ApiResponse } from './ApiResponse';
import logger from './Logger';
import Sentry, { isInitSentry } from './Sentry';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(originException: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const httpException = this.parseError(originException);
        if (httpException.getStatus() >= HttpStatus.INTERNAL_SERVER_ERROR) {
            this.captureBySentry(originException);
        }
        logger.error(httpException.message);
        const errors = this.exceptionToResponseErrors(httpException);
        response
            .status(httpException.getStatus())
            .json(ApiResponse.fromObject(null, errors) as OptionsJson);
    }

    private exceptionToResponseErrors(exception: HttpException): ApiError[] {
        const exceptionData = exception.getResponse();
        const status = exception.getStatus();

        if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
            return this.buildMessage('Internal server error');
        }
        if (status >= HttpStatus.BAD_REQUEST && Array.isArray(exceptionData['message'])) {
            return exceptionData['message'].map(mess => ({ message: mess }));
        }

        return this.buildMessage(exceptionData['message']);
    }

    private parseError(exception: Error): HttpException {
        return exception instanceof HttpException ?
            exception :
            new InternalServerErrorException(exception.message);
    }

    private buildMessage(message: string): [ { message: string } ] {
        return [ { message } ];
    }

    private captureBySentry(exception: Error) {
        if (isInitSentry()) {
            Sentry.captureException(exception);
        }
    }

}
