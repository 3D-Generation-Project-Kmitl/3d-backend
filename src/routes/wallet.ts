import { walletController } from '../controllers';
import { permit, verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/all', [verifyToken, permit("ADMIN")], walletController.getAllWalletTransactions);
router.get('/', [verifyToken], walletController.getWalletTransactions);
router.post('/withdraw', [verifyToken], walletController.withdraw);

export default router;