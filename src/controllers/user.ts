import { sendResponse } from '../utils/response';

import { Request, Response } from 'express';
import prisma from '../utils/prisma';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        sendResponse(res, { users }, 200);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const userId = Number(req.params.id)
        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        });
        sendResponse(res, { user }, 200);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUsers,
    getUser
}