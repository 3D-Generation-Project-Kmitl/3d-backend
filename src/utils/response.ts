import { Response } from "express";
import logger from "./logger";

export function formatError(error: any) {
    const newError = JSON.parse(JSON.stringify(error));

    newError.statusCode = undefined;
    delete newError.meta;

    return {
        error: {
            ...newError,
        },
        success: false,
        message: error.message,
    };
}

export function formatResponse(result: any) {
    const message = result.message || "success";
    result.message = undefined;
    return {
        data: result,
        success: true,
        message: message,
    };
}

export function sendResponse(res: Response, payload: any, statusCode = 200) {
    logger.info(`Response: ${JSON.stringify(payload)}`);
    return res.status(statusCode).json(formatResponse(payload));
}