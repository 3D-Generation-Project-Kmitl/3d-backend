import { favoriteController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken], favoriteController.create);
router.get('/', [verifyToken], favoriteController.get);
router.delete('/', [verifyToken], favoriteController.remove);

export default router;