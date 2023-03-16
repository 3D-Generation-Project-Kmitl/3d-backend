import { reportController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken], reportController.create);
router.get('/admin', [verifyToken, permit("ADMIN")], reportController.getReportProducts);
router.patch('/admin', [verifyToken, permit("ADMIN")], reportController.adminUpdateReportProduct);

export default router;