import { cartController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken], cartController.create);
router.get('/', [verifyToken], cartController.get);
router.delete('/', [verifyToken], cartController.remove);

export default router;