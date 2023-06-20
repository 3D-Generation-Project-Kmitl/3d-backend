import { paymentController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.post('/getPaymentIntent', [verifyToken], paymentController.create);
router.post('/webhook', paymentController.webhook);

export default router;