import prisma from '../utils/prisma';

export const createCategory = async (category: any, picture: any) => {
    const categoryResult = await prisma.category.create({
        data: {
            ...category,
            picture: picture
        }
    });
    return categoryResult;
}

export const getCategories = async () => {
    const categoryResult = await prisma.category.findMany();
    return categoryResult;
}

export const updateCategory = async (id: number, category: any, picture: any) => {
    const categoryResult = await prisma.category.update({
        where: {
            categoryId: id
        },
        data: {
            ...category,
            picture: picture
        }
    });
    return categoryResult;
}

export const removeCategory = async (id: number) => {
    const categoryResult = await prisma.category.delete({
        where: {
            categoryId: id
        }
    });
    return categoryResult;
}