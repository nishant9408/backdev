import { BadRequestException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

export function sendResponse(result: any, response: Response): Response {
    return response.status(HttpStatus.OK).send({
        data: result,
        errors: [],
    });
}

export async function validateOrThrow<T>(cls: ClassType<T>, request: Request): Promise<void> {
    const validationErrors = await validate(plainToClass(cls, request.body));
    if (validationErrors.length > 0) {
        throw new BadRequestException(validationErrors);
    }
}
