import express from 'express';
import router from './routes';
import CORSErrorMiddleware from './middlewares/cors-handler';

const app = express();

app.use(express.json());
app.use(CORSErrorMiddleware);
app.use(router);

app.listen(3333, () => console.log('Server listening at http://localhost:3333'));