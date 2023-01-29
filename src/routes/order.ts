import { orderController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/myOrders', [verifyToken], orderController.getOrdersByUserId);
router.post('/', [verifyToken], orderController.create);
router.get('/:id', [verifyToken], orderController.getOrderById);


export default router;