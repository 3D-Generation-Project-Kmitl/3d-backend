import prisma from '../utils/prisma';
import { ProductStatus } from '@prisma/client';

export const createProduct = async (product: any) => {
    const newProduct = await prisma.product.create({
        data: product,
        include: {
            Model: true,
            Category: true,
            _count: {
                select: {
                    OrderProduct: true,
                    Favorite: true,
                }
            }
        }
    });
    return newProduct;
}

export const getProducts = async () => {
    const products = await prisma.product.findMany(
        {
            orderBy: {
                views: 'desc'
            },
            include: {
                Model: true,
                Category: true
            },
            where: {
                status: ProductStatus.AVAILABLE
            }
        }
    );
    return products;
}

export const getMyProducts = async (userId: number) => {
    const products = await prisma.product.findMany({
        where: {
            userId: userId
        },
        include: {
            Model: true,
            Category: true,
            _count: {
                select: {
                    OrderProduct: true,
                    Favorite: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return products;

}

export const getProduct = async (id: number) => {
    const product = await prisma.product.update({
        where: {
            productId: id
        },
        data: {
            views: {
                increment: 1
            }
        },
        include: {
            Model: true,
            User: {
                include: {
                    _count: {
                        select: {
                            Followers: true,
                        }
                    }
                }
            },
            Category: true
        }
    });

    return product;
}

export const updateProduct = async (id: number, product: any) => {
    const updatedProduct = await prisma.product.update({
        where: {
            productId: id
        },
        data: product,
        include: {
            Model: true,
            Category: true,
            _count: {
                select: {
                    OrderProduct: true,
                    Favorite: true,
                }
            }
        }
    });
    return updatedProduct;
}

export const removeProduct = async (id: number) => {
    await prisma.product.delete({
        where: {
            productId: id
        }
    });
}

export const searchProduct = async (keyword: string) => {
    const products = await prisma.product.findMany({
        where: {
            status: ProductStatus.AVAILABLE,
            OR: [
                {
                    name: {
                        mode: 'insensitive',
                        contains: keyword
                    }
                },
                {
                    details: {
                        mode: 'insensitive',
                        contains: keyword
                    }
                },
                {
                    Category: {
                        name: {
                            mode: 'insensitive',
                            contains: keyword
                        }
                    }
                }
            ]

        },
        include: {
            Model: true,
            Category: true
        }
    });
    return products;
}