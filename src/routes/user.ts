import { userController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/users', [verifyToken, permit('ADMIN')], userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', [verifyToken], userController.update);
router.delete('/:id', [verifyToken], userController.remove);

export default router;