import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';


export default {
    async create(req: Request, res: Response) {
        const { name, email, password, accessType } = req.body;
        let user = await prisma.user.findUnique({ where: { email } });

        try {
            if (user) {
                return res.json({ error: 'Usuário já cadastrado.' });
            }

            if (password.length < 6) {
                return res.json({ error: 'A senha deve conter ao menos 6 caracteres.' });
            }

            const passwordHash = await hash(password, 16); // senha padrão: 123456

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                    accessType
                }
            });

            return res.json(user);

        } catch (error) {
            res.json({ error });
        }
    },

    async findAll(req: Request, res: Response) {
        const users = await prisma.user.findMany();

        try {
            return res.json(users);

        } catch (error) {
            res.json({ error });
        }
    },

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: +id } });

        try {
            if (!user) {
                return res.json({ error: 'Usuário não encontrado.' });
            }

            return res.json(user);

        } catch (error) {
            res.json({ error });
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;
        let user = await prisma.user.findUnique({ where: { id: +id } });

        try {
            if (!user) {
                return res.json({ error: 'Usuário não encontrado.' });
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
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: +id } });

        try {
            if (!user) {
                res.json({ error: 'Usuário não encontrado.' });
            }

            await prisma.user.delete({ where: { id: +id } });

            return res.json({ message: 'Usuário deletado com sucesso!' });

        } catch (error) {
            res.json({ error });
        }
    }
};