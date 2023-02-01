import prisma from '../utils/prisma';
import { ModelType, Cart, Product, Model } from '@prisma/client';

type CartProduct = Cart & { Product: Product & { Model: Model } };

export const createModel = async (userId: number, type: ModelType, model: string, picture: string) => {
    const modelResult = await prisma.model.create({
        data: {
            userId: userId,
            type: type,
            model: model,
            picture: picture
        }
    });
    return modelResult;
}

export const createModelMany = async (carts: CartProduct[], type: ModelType) => {
    const modelResult = await prisma.model.createMany({
        data: carts.map((cart: CartProduct) => {
            return {
                userId: cart.userId,
                type: type,
                model: cart.Product.Model.model,
                picture: cart.Product.Model.picture
            }
        })
    });
    return modelResult;
}

export const getModelById = async (id: number) => {
    const modelResult = await prisma.model.findUnique({
        where: {
            modelId: id
        }
    });
    return modelResult;
}

export const getModelsByStoreId = async (userId: number, isProduct: boolean) => {
    if (isProduct) {
        const modelResult = await prisma.model.findMany({
            where: {
                userId: userId,
                type: ModelType.ADD || ModelType.CREATE,
                NOT: {
                    Product: null
                }
            },
        });
        return modelResult;
    } else {
        const modelResult = await prisma.model.findMany({
            where: {
                userId: userId,
                type: ModelType.ADD || ModelType.CREATE,
                Product: null
            },
        });
        return modelResult;
    }
}

export const getModelsByCustomerId = async (userId: number) => {
    const modelResult = await prisma.model.findMany({
        where: {
            userId: userId,
            type: ModelType.BUY
        }
    });
    return modelResult;
}

export const updateModel = async (id: number, model: string, picture: string) => {
    const updateResult = await prisma.model.update({
        where: {
            modelId: id
        },
        data: {
            picture: picture,
            model: model
        }
    });
    return updateResult;
}

export const removeModel = async (id: number) => {
    const modelResult = await prisma.model.delete({
        where: {
            modelId: id
        }
    });
    return modelResult;
}