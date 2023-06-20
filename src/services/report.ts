import prisma from '../utils/prisma';

export const createReportProduct = async ({
    userId,
    productId,
    detail
}: {
    userId: number,
    productId: number,
    detail: string
}) => {
    const reportResult = await prisma.reportProduct.upsert({
        where: {
            userId_productId: {
                userId: userId,
                productId: productId
            }
        },
        update: {
            detail: detail
        },
        create: {
            userId: userId,
            productId: productId,
            detail: detail
        }
    });
    return reportResult;
}

export const getReportProducts = async (isClosed: boolean) => {
    const reportResult = await prisma.reportProduct.findMany({
        where: {
            isClosed: isClosed
        },
        include: {
            User: true,
            Product: {
                include: {
                    Model: true
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return reportResult;
}

export const adminUpdateReportProduct = async ({
    userId,
    productId,
    isClosed
}: {
    userId: number,
    productId: number,
    isClosed: boolean
}) => {
    const reportResult = await prisma.reportProduct.update({
        where: {
            userId_productId: {
                userId: userId,
                productId: productId
            }
        },
        data: {
            isClosed: isClosed
        }
    });
    return reportResult;
}
