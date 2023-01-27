import { paymentController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken], paymentController.create);

export default router;