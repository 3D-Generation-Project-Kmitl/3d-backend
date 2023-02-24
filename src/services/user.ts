import prisma from '../utils/prisma';
import { ProductStatus, User } from '@prisma/client';

export const createUser = async (user: User) => {
    const userResult = await prisma.user.create({
        data: user,
        include: {
            _count: {
                select: {
                    Followers: true,
                    Following: true
                }
            }
        }
    });
    return userResult;
}

export const getUsers = async () => {
    const userResult = await prisma.user.findMany();
    return userResult;
}

export const getUserById = async (userId: number) => {
    const userResult = await prisma.user.findUnique({
        where: {
            userId: userId
        },
        include: {
            _count: {
                select: {
                    Followers: true,
                    Following: true
                }
            }
        }
    });
    return userResult;
}

export const getUserByEmail = async (email: string) => {
    const userResult = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            _count: {
                select: {
                    Followers: true,
                    Following: true
                }
            }
        }
    });
    return userResult;
}

export const getUserByIdWithProducts = async (userId: number) => {
    const userResult = await prisma.user.findUnique({
        where: {
            userId: userId
        },
        include: {
            Product: {
                include: {
                    Model: true,
                },
                where: {
                    status: ProductStatus.AVAILABLE
                }
            },
            _count: {
                select: {
                    Followers: true,
                }
            }
        }
    });
    return userResult;
}

export const updateUser = async (userId: number, user: User) => {
    const userResult = await prisma.user.update({
        where: {
            userId: userId
        },
        data: user,
        include: {
            _count: {
                select: {
                    Followers: true,
                    Following: true
                }
            }
        }

    });
    return userResult;
}

export const updateVerified = async (userId: number, isVerified: boolean) => {
    await prisma.user.update({
        where: {
            userId: userId
        },
        data: {
            isVerified: isVerified
        }
    });
}

export const updatePassword = async (userId: number, password: string) => {
    await prisma.user.update({
        where: {
            userId: userId
        },
        data: {
            password: password
        }
    });
}

export const removeUser = async (userId: number) => {
    const user = await prisma.user.delete({
        where: {
            userId: userId
        }
    });

    return user;
}