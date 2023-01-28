import { orderController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken], orderController.create);
router.get('/', [verifyToken], orderController.getOrderById);
router.get('/myOrders', [verifyToken], orderController.getOrdersByUserId);

export default router;