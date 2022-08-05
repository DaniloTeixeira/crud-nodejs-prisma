import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';

const app = express();

const CORSErrorMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    app.use(cors());
    next();
});

export default CORSErrorMiddleware;