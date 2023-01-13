import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { CommonError } from '../errors/common';
import { ApplicationError } from '../errors/applicationError';
import { sendResponse, formatError } from '../utils/response';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApplicationError) {
        const code = err.statusCode || 500;
        const formattedError = formatError(err);
        logger.error(err.stack);
        return res.status(code).json(formattedError);
    }

    if (err instanceof Error) {
        const newError = new ApplicationError(CommonError.INTERNAL_SERVER_ERROR);
        const code = newError.statusCode || 500;
        const formattedError = formatError(newError);
        logger.error(err.stack);
        return res.status(code).json(formattedError);
    }

    const unknownError = new ApplicationError(CommonError.UNKNOWN_ERROR);

    return sendResponse(res, unknownError, unknownError.statusCode);
}