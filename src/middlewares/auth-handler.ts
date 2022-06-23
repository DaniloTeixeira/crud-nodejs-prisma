import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { TokenPayload } from '../models/TokenPayload';


const AuthMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token was not provided' });
    }

    const [, token] = authorization.split(' ');
    const secret = String(process.env.SECRET);
    const decodedToken = verify(token, secret);
    const { id } = decodedToken as TokenPayload;

    try {
        req.userId = id;

        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }

});

export default AuthMiddleware;