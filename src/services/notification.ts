import prisma from '../utils/prisma';

export const getNotification = async (userId: number) => {
    const notificationResult = await prisma.notification.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return notificationResult;
}

export const createNotification = async ({
    userId,
    picture,
    title,
    description,
    link
}: {
    userId: number,
    picture: string,
    title: string,
    description: string,
    link: string
}) => {
    const notificationResult = await prisma.notification.create({
        data: {
            userId: userId,
            picture: picture,
            title: title,
            description: description,
            link: link
        }
    });
    return notificationResult;
}

export const readNotification = async (notificationId: number) => {
    const notificationResult = await prisma.notification.update({
        where: {
            notificationId: notificationId
        },
        data: {
            isRead: true
        }
    });
    return notificationResult;
}

export const deleteNotification = async (notificationId: number) => {
    const notificationResult = await prisma.notification.delete({
        where: {
            notificationId: notificationId
        }
    });
    return notificationResult;
}

