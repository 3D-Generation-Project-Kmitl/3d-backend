import { Response } from "express";

export function formatResponse(result: any) {
    return {
        data: result,
        success: true,
        message: "",
    };
}

export function sendResponse(res: Response, payload: any, statusCode = 200) {
    console.log(new Date().toISOString() + ": code " + statusCode + " " + JSON.stringify(payload).slice(0, 20) + "...");
    return res.status(statusCode).json(formatResponse(payload));
}