import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import { categoryService } from '../services';
import filePath2FullURL from '../utils/filePath2FullURL';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.body;
        const picture = filePath2FullURL(req);
        if (!picture) {
            throw new ApplicationError(CommonError.INVALID_REQUEST);
        }

        const categoryResult = await categoryService.createCategory(category, picture);
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryResult = await categoryService.getCategories();
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getCategoriesCountProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryResult = await categoryService.getCategoriesCountProducts();
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const category = req.body;
        const picture = filePath2FullURL(req);

        const categoryResult = await categoryService.updateCategory(id, category, picture);
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const categoryResult = await categoryService.removeCategory(id);
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

export default {
    create,
    getCategories,
    getCategoriesCountProducts,
    update,
    remove
}