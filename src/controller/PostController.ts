import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export default {
    async create(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
        const user = await prisma.user.findUnique({ where: { id: +id } });

        try {
            if (!user) {
                return res.json({ error: 'User not found.' });
            }

            const post = await prisma.post.create({
                data: { content, userId: user?.id },
                include: { author: true }
            });

            return res.json(post);

        } catch (error) {
            res.json({ error });
        }
    },

    async findAll(req: Request, res: Response) {
        const posts = await prisma.post.findMany();

        try {
            return res.json(posts);

        } catch (error) {
            res.json({ error });
        }
    },

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const post = await prisma.post.findUnique({ where: { id: +id } });

        try {
            if (!post) {
                return res.json({ error: 'Post not found.' });
            }

            return res.json(post);

        } catch (error) {
            res.json({ error });
        }
    },

    async update(req: Request, res: Response) {
        const { id, content } = req.params;
        const post = await prisma.post.findUnique({ where: { id: +id } });

        try {
            if (!post) {
                return res.json({ error: 'Post not found.' });
            }

            await prisma.post.update({
                where: { id: +id },
                data: { content }
            });

            return res.json({ message: 'Post updated.' });

        } catch (error) {
            res.json({ error });
        }

    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const post = await prisma.post.findUnique({ where: { id: +id } });

        try {
            if (!post) {
                return res.json({ error: 'Post not found.' });
            }

            await prisma.post.delete({ where: { id: +id } });

            return res.json({ message: 'Post successfully deleted.' });

        } catch (error) {
            res.json({ error });
        }
    }
};