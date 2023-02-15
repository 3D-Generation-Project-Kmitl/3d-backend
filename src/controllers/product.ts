import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import { productService, userService } from '../services';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const product = req.body
        product.userId = userId;
        const newProduct = await productService.createProduct(product);
        sendResponse(res, newProduct, 201);
    } catch (error) {
        return next(error)
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getProducts();
        sendResponse(res, products, 200);
    } catch (error) {
        return next(error)
    }
}

const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const products = await productService.getMyProducts(userId);
        sendResponse(res, products, 200);
    } catch (error) {
        return next(error)
    }
}

const getProductsByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = Number(req.params.storeId);
        const products = await userService.getUserByIdWithProducts(storeId);
        sendResponse(res, products, 200);
    } catch (error) {
        return next(error)
    }
}

const searchProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { keyword } = req.query as { keyword: string };
        keyword = keyword.toLowerCase();
        const products = await productService.searchProduct(keyword);
        sendResponse(res, products, 200);
    } catch (error) {
        return next(error)
    }
}

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const product = await productService.getProduct(id);
        if (!product) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }
        sendResponse(res, product, 200);
    } catch (error) {
        return next(error)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const id = Number(req.params.id);
        const product = req.body
        const productResult = await productService.getProduct(id);
        if (!productResult) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }
        if (userId !== productResult.userId) {
            throw new ApplicationError(CommonError.UNAUTHORIZED);
        }
        const updatedProduct = await productService.updateProduct(id, product);
        sendResponse(res, updatedProduct, 200);
    } catch (error) {
        return next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const id = Number(req.params.id);
        const product = await productService.getProduct(id);
        if (!product) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }
        if (userId !== product.userId) {
            throw new ApplicationError(CommonError.UNAUTHORIZED);
        }
        await productService.removeProduct(id);
        sendResponse(res, null, 204);
    } catch (error) {
        return next(error)
    }
}


export default {
    create,
    getProducts,
    getMyProducts,
    getProductsByStoreId,
    searchProduct,
    getProduct,
    update,
    remove
}