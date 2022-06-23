import { Router } from 'express';
import UserController from './controller/UserController';
import PostController from './controller/PostController';

const router = Router();

// User routes
router.post('/user', UserController.create);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

// Post routes
router.post('/post/user/:id', PostController.create);
router.get('/posts', PostController.findAll);
router.get('/post/:id', PostController.findById);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.delete);

export default router;