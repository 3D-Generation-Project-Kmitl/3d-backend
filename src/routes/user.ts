import { userController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { UpdateUserRequestDTO } from '../dtos/user';
import { Router } from 'express';

const router = Router();

router.get('/users', [verifyToken, permit('ADMIN')], userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', [verifyToken, validateRequest(UpdateUserRequestDTO)], userController.update);
router.delete('/:id', [verifyToken], userController.remove);

export default router;