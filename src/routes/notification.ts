import { notificationController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/', [verifyToken], notificationController.getNotifications);
router.delete('/:id', [verifyToken], notificationController.deleteNotification);
router.put('/read/:id', [verifyToken], notificationController.readNotification);

export default router;