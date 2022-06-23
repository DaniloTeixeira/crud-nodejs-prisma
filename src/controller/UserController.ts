import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';


export default {
    async create(req: Request, res: Response) {
        try {
            const { name, email } = req.body;
            let user = await prisma.user.findUnique({ where: { email } });

            if (user) {
                return res.json({ error: 'Ops! Email already registered in the database' });
            }

            user = await prisma.user.create({
                data: {
                    name,
                    email
                },
            });

            return res.json(user);

        } catch (error) {
            res.json({ error });
        }
    },

    async findAll(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();

            return res.json(users);

        } catch (error) {
            res.json({ error });
        }
    },

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: +id } });

            if (!user) {
                return res.json({ error: 'Ops! User not found.' });
            }

            return res.json(user);

        } catch (error) {
            res.json({ error });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            let user = await prisma.user.findUnique({ where: { id: +id } });

            if (!user) {
                return res.json({ error: 'Ops! User not found.' });
            }

            user = await prisma.user.update({
                where: { id: +id },
                data: { name, email }
            });

            return res.json(user);

        } catch (error) {
            return res.json({ error });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: +id } });

            if (!user) {
                res.json({ error: 'Ops! User not found.' });
            }

            await prisma.user.delete({ where: { id: +id } });

            return res.json({ message: 'Success! User deleted.' });

        } catch (error) {
            res.json({ error });
        }
    }
};