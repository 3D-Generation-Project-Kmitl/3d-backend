import { Response } from "express";

export function formatResponse(result: any, override = {}) {
    return {
        data: result,
        success: true,
        ...override,
    };
}

export function sendResponse(res: Response, payload: any, statusCode = 200) {
    return res.status(statusCode).json(formatResponse(payload));
}