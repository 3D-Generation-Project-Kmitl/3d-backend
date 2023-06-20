import { walletController } from '../controllers';
import { permit, verifyToken } from '../middleware/auth';
import { Router } from 'express';
import upload from '../middleware/upload';

const router = Router();

router.get('/admin', [verifyToken, permit("ADMIN")], walletController.adminGetWithdrawWalletTransactions);
router.patch('/admin', [verifyToken, permit("ADMIN"), upload.single('evidence')], walletController.adminUpdateWalletTransaction);
router.get('/all', [verifyToken, permit("ADMIN")], walletController.getAllWalletTransactions);
router.get('/', [verifyToken], walletController.getWalletTransactions);
router.post('/withdraw', [verifyToken], walletController.withdraw);

export default router;