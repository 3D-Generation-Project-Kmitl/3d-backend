import prisma from '../utils/prisma';

export const createFavorite = async (userId: number, productId: number) => {
    const favorite = await prisma.favorite.create({
        data: {
            userId,
            productId
        },
        include: {
            Product: {
                include: {
                    Model: true
                }
            }
        }
    });
    return favorite;
}

export const getFavoriteByUserId = async (userId: number) => {
    const favorite = await prisma.favorite.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            Product: {
                include: {
                    Model: true
                }
            }
        }
    });
    return favorite;
}

export const removeFavorite = async (userId: number, productId: number) => {
    const favorite = await prisma.favorite.deleteMany({
        where: {
            userId,
            productId
        }
    });
    return favorite;
}