import prisma from '../utils/prisma';

export const createProduct = async (product: any) => {
    const newProduct = await prisma.product.create({
        data: product
    });
    return newProduct;
}

export const getProducts = async () => {
    const products = await prisma.product.findMany(
        {
            orderBy: {
                productId: 'desc'
            },
            include: {
                Model: true
            }
        }
    );
    return products;
}

export const getProduct = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            productId: id
        },
        include: {
            Model: true,
            User: true
        }
    });
    return product;
}

export const updateProduct = async (id: number, product: any) => {
    const updatedProduct = await prisma.product.update({
        where: {
            productId: id
        },
        data: product
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
            Model: true
        }
    });
    return products;
}