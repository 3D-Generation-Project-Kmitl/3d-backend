import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export function formatResponse(result: any) {
    return {
        data: result,
        success: true,
        message: "",
    };
}

export function sendResponse(res: Response, payload: any, statusCode = 200) {
    return res.status(statusCode).json(formatResponse(payload));
}