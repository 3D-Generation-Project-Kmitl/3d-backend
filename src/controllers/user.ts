import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { User } from '@prisma/client';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await prisma.user.findMany();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUsers
}