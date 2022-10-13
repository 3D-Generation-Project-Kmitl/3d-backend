import { Request, Response } from 'express';
import prisma from '../utils/prisma';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUsers
}