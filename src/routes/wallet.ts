import { walletController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/', [verifyToken], walletController.getWalletTransactions);
router.post('/withdraw', [verifyToken], walletController.withdraw);

export default router;