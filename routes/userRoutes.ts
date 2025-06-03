import { Router } from 'express';
import { UserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// User routes
router.post('/', userController.createUser.bind(userController));
router.get('/:id', userController.getUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));

export default router; 