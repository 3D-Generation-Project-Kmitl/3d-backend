import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import { reportService } from '../services';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, detail } = req.body;
        const userId = req.userId;
        const newReport = await reportService.createReportProduct({
            userId: userId,
            productId: productId,
            detail: detail
        });
        sendResponse(res, newReport, 201);
    } catch (error) {
        return next(error)
    }
}

const getReportProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportProducts = await reportService.getReportProducts(false);
        sendResponse(res, reportProducts, 200);
    } catch (err) {
        return next(err);
    }
}

const adminUpdateReportProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, productId, isClosed } = req.body;
        const result = await reportService.adminUpdateReportProduct({
            userId: userId,
            productId: productId,
            isClosed: isClosed
        });
        sendResponse(res, result, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    create,
    getReportProducts,
    adminUpdateReportProduct
}