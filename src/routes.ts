import { Router } from 'express';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/auth-handler';

const router = Router();

// User routes
router.post('/user/create-user', UserController.create);
// router.get('/users', AuthMiddleware, UserController.findAll);
router.get('/users',  UserController.findAll);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

// Post routes
router.post('/post/create-post/userId/:id', PostController.create);
router.get('/posts', PostController.findAll);
router.get('/post/:id', PostController.findById);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.delete);

// Auth route
router.post('/auth/login', AuthController.authenticate);

export default router;