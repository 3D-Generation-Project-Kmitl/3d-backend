import prisma from '../utils/prisma';

export const createCart = async (userId: number, productId: number) => {
    const cart = await prisma.cart.create({
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
    return cart;
}

export const getCartByUserId = async (userId: number) => {
    const cart = await prisma.cart.findMany({
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
    return cart;
}

export const removeCart = async (userId: number, productId: number) => {
    const cart = await prisma.cart.deleteMany({
        where: {
            userId,
            productId
        }
    });
    return cart;
}

export const removeAllCart = async (userId: number) => {
    const cart = await prisma.cart.deleteMany({
        where: {
            userId
        }
    });
    return cart;
}
