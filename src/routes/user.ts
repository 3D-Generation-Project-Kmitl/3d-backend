import { userController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { UpdateUserRequestDTO } from '../dtos/user';
import upload from '../middleware/upload';
import { Router } from 'express';

const router = Router();

router.get('/all', [verifyToken, permit('ADMIN')], userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', [verifyToken, validateRequest(UpdateUserRequestDTO), upload.single('picture')], userController.update);
router.delete('/:id', [verifyToken], userController.remove);

export default router;