import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

router.post('/user', UserController.create);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

export default router;