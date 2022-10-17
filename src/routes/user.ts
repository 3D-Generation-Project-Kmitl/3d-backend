import { userController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/users', [verifyToken, permit('ADMIN')], userController.getUsers);
router.get('/users/:id', userController.getUser);

export default router;