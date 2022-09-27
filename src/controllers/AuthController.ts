import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { prisma } from '../utils/prisma';

export default {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        try {
            if (!user) {
                return res.status(404).json({error: 'Usuário não encontrado.'})
            }

            const isEmailMatch = await email === user.email;
            const isPasswordMatch = await compare(password, user.password);

            if (!isEmailMatch || !isPasswordMatch) {
                return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
            }

            const secret = String(process.env.SECRET);
            const token = sign({ id: user.id }, secret, { expiresIn: '1d' });

            return res.json({ user, token });

        } catch (error) {
            res.json({ error });
        }
    }
};