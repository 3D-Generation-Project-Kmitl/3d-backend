import prisma from '../utils/prisma';

export const createModel = async (model: any) => {
    const modelResult = await prisma.model.create({
        data: model
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

export const getModelsByUserId = async (userId: number) => {
    const modelResult = await prisma.model.findMany({
        where: {
            userId: userId,
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