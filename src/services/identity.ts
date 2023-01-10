import prisma from '../utils/prisma';
import { IdentityStatus } from '@prisma/client';

export const createIdentity = async (identity: any) => {
    const identityResult = await prisma.identity.create({
        data: identity
    });
    return identityResult;
}

export const getIdentityByUserId = async (userId: number) => {
    const identityResult = await prisma.identity.findUnique({
        where: {
            userId: userId
        }
    });
    return identityResult;
}

export const updateIdentity = async (userId: number, identity: any) => {
    const identityResult = await prisma.identity.update({
        where: {
            userId: userId
        },
        data: identity
    });
    return identityResult;
}

export const adminUpdateIdentity = async (userId: number, status: IdentityStatus, issue: string) => {
    const identityResult = await prisma.identity.update({
        where: {
            userId: userId
        },
        data: {
            status: status,
            issue: issue
        }
    });
}